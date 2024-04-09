import {
    Account,
    Asset,
    Ledger,
    LedgerClientFactory,
    TransactionArbitrarySubtype,
    TransactionAssetSubtype, TransactionList,
    TransactionPaymentSubtype,
    TransactionType, UnconfirmedTransactionList,
} from "@signumjs/core";
import {withError} from "@/common/withError";
import {
    Amount,
    ChainTime,
    ChainValue,
} from "@signumjs/util";
import {parseGrantTokenMessage} from "@/common/transactionParser";

export interface RelevantAccountTransaction {
    message: string;
    signa: string;
    vericlean: string;
    date: Date;
    sender: {
        name: string;
        id: string;
    };
}

export interface GrantCollectorTokenTransaction {
    sender: string;
    collector: string;
    material: {
        amount: string;
        id: string;
    };
    timestamp: number;
    transactionId: string;
}

interface FetchTransactionsFromToArgs {
    senderId: string;
    receiverId: string;
    timestamp?: number;
    includePending?: boolean;
}

interface LedgerServiceArgs {
    nodeHost: string;
    vericleanTokenId: string;
    vericleanContractId: string;
}

export class LedgerService {
    private readonly ledger: Ledger;
    private vericleanToken: Asset | null = null;

    constructor(private _args: LedgerServiceArgs) {
        this.ledger = LedgerClientFactory.createClient({
            nodeHost: _args.nodeHost,
        });
    }

    get ledgerInstance() {
        return this.ledger;
    }

    get host() {
        return this._args.nodeHost;
    }

    fetchAccount(accountId: string) {
        return withError(async () => {
            return await this.ledger.account.getAccount({accountId, includeCommittedAmount: false});
        });
    }

    fetchTransactionFromTo({receiverId, senderId, timestamp = 0, includePending = false}: FetchTransactionsFromToArgs) {
        return withError(async () => {
            const [pending, confirmed] = await Promise.all([
                includePending ? this.ledger.account.getUnconfirmedAccountTransactions(senderId, false) : Promise.resolve({
                    unconfirmedTransactions: [],
                    requestProcessingTime: 0
                } as UnconfirmedTransactionList),
                // since 3.8
                this.ledger.service.query<TransactionList>("getAccountTransactions", {
                    sender: senderId,
                    recipient: receiverId,
                    timestamp,
                    includeIndirect: false,
                })
            ])

            return [
                ...pending.unconfirmedTransactions.filter( t => t.recipient === receiverId ),
                ...confirmed.transactions
            ]
        })
    }

    fetchTransaction(transactionId: string) {
        return withError(async () => this.ledger.transaction.getTransaction(transactionId))
    }

    fetchTokenInfo(tokenId: string) {
        return withError(async () => {
            return await this.ledger.asset.getAsset({assetId: tokenId});
        });
    }

    async fetchVericleanTokenInfo() {
        if (!this.vericleanToken) {
            this.vericleanToken = await this.fetchTokenInfo(
                this._args.vericleanTokenId
            );
        }

        return Promise.resolve(this.vericleanToken);
    }

    // TODO: this transactions list needs to be adjusted for stock contract stuff.
    fetchRelevantAccountTransactions(accountId: string) {
        return withError(async () => {
            const [transactions, vericleanToken] = await Promise.all([
                this.ledgerInstance.account.getAccountTransactions({
                    accountId,
                    includeIndirect: false,
                }),
                this.fetchVericleanTokenInfo(),
            ]);

            const accountsMap = new Map<string, Account>();

            const fetchAccountsName = async (accountId: string) => {
                if (accountsMap.has(accountId)) {
                    return accountsMap.get(accountId)?.name || "";
                }
                const account = await this.fetchAccount(accountId);
                accountsMap.set(accountId, account);
                return account.name || "";
            };

            const transactionsMap = new Map<string, RelevantAccountTransaction>();
            for (let transaction of transactions.transactions) {
                if (
                    transaction.type === TransactionType.Asset &&
                    transaction.subtype === TransactionAssetSubtype.AssetTransfer &&
                    transaction.attachment.asset === vericleanToken.asset
                ) {
                    transactionsMap.set(transaction.transaction, {
                        message: (transaction.attachment.message as string) || "",
                        vericlean: ChainValue.create(vericleanToken.decimals)
                            .setAtomic(transaction.attachment.quantityQNT || "0")
                            .getCompound(),
                        signa: Amount.fromPlanck(transaction.amountNQT).getSigna(),
                        date: ChainTime.fromChainTimestamp(transaction.timestamp).getDate(),
                        sender: {
                            name: await fetchAccountsName(transaction.sender),
                            id: transaction.sender,
                        },
                    });
                }

                if (
                    transaction.type === TransactionType.Arbitrary &&
                    transaction.subtype === TransactionArbitrarySubtype.Message &&
                    transaction.attachment.message &&
                    transaction.attachment.messageIsText
                ) {
                    transactionsMap.set(transaction.transaction, {
                        message: (transaction.attachment.message as string) || "",
                        vericlean: "0",
                        signa: Amount.fromPlanck(transaction.amountNQT).getSigna(),
                        date: ChainTime.fromChainTimestamp(transaction.timestamp).getDate(),
                        sender: {
                            name: await fetchAccountsName(transaction.sender),
                            id: transaction.sender,
                        },
                    });
                }

                if (
                    transaction.type === TransactionType.Payment &&
                    transaction.subtype === TransactionPaymentSubtype.Ordinary
                ) {
                    transactionsMap.set(transaction.transaction, {
                        message: (transaction.attachment?.message as string) || "",
                        vericlean: "0",
                        signa: Amount.fromPlanck(transaction.amountNQT).getSigna(),
                        date: ChainTime.fromChainTimestamp(transaction.timestamp).getDate(),
                        sender: {
                            name: await fetchAccountsName(transaction.sender),
                            id: transaction.sender,
                        },
                    });
                }
            }
            return transactionsMap;
        });
    }

    private async fetchIncomingMaterialTransactionsPerCollector(
        collectorId: string
    ) {
        let startIndex: number | undefined = 0;
        const transactionsMap = new Map<string, GrantCollectorTokenTransaction>();
        // TODO: needs to be incremental! (using timestamp)
        while (startIndex !== undefined) {
            const {nextIndex, transactions} =
                await this.ledger.account.getAccountTransactions({
                    accountId: this._args.vericleanContractId,
                    type: TransactionType.Payment,
                    subtype: TransactionPaymentSubtype.Ordinary,
                    includeIndirect: false,
                    firstIndex: startIndex,
                    lastIndex: startIndex + 500,
                });
            startIndex = nextIndex;
            for (let transaction of transactions) {
                // only incoming/received transactions are of interest
                if (transaction.recipient !== this._args.vericleanContractId) {
                    continue;
                }
                const parsed = parseGrantTokenMessage(transaction);
                if (parsed && parsed.collectorId === collectorId) {
                    transactionsMap.set(transaction.transaction, {
                        material: {
                            id: parsed.materialId,
                            amount: parsed.quantity,
                        },
                        collector: collectorId,
                        transactionId: transaction.transaction,
                        sender: transaction.sender,
                        timestamp: transaction.timestamp,
                    });
                }
            }
        }

        return transactionsMap;
    }
}

import {
  Account,
  Asset,
  Ledger,
  LedgerClientFactory,
  Transaction,
  TransactionArbitrarySubtype,
  TransactionAssetSubtype,
  TransactionPaymentSubtype,
  TransactionType,
} from "@signumjs/core";
import { withError } from "@/services/withError";
import {
  Amount,
  ChainTime,
  ChainValue,
  convertHexEndianess,
  convertHexStringToDecString,
} from "@signumjs/util";

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
      return await this.ledger.account.getAccount({ accountId });
    });
  }

  fetchTokenInfo(tokenId: string) {
    return withError(async () => {
      return await this.ledger.asset.getAsset({ assetId: tokenId });
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

  fetchCollectedMaterialPerAccount(accountId: string) {
    return withError(async () =>
      this.fetchIncomingMaterialTransactionsPerCollector(accountId)
    );
  }

  private async fetchIncomingMaterialTransactionsPerCollector(
    collectorId: string
  ) {
    let startIndex: number | undefined = 0;
    const transactionsMap = new Map<string, GrantCollectorTokenTransaction>();
    // TODO: needs to be incremental! (using timestamp)
    while (startIndex !== undefined) {
      const { nextIndex, transactions } =
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
        const parsed = this.parseGrantTokenMessage(transaction);
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

  private parseGrantTokenMessage(transaction: Transaction) {
    if (
      transaction?.attachment &&
      transaction.attachment.message &&
      transaction.attachment.messageIsText === false
    ) {
      const materialIdHex = transaction.attachment.message.substring(0, 16);
      const quantityHex = transaction.attachment.message.substring(16, 32);
      const collectorIdHex = transaction.attachment.message.substring(32, 48);

      return {
        materialId: convertHexStringToDecString(
          convertHexEndianess(materialIdHex)
        ),
        quantity: convertHexStringToDecString(convertHexEndianess(quantityHex)),
        collectorId: convertHexStringToDecString(
          convertHexEndianess(collectorIdHex)
        ),
      };
    }
    return null;
  }
}

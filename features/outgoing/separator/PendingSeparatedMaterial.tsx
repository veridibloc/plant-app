"use client";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import useSWR, {useSWRConfig} from "swr";
import {useLedgerService} from "@/ui/hooks/useLedgerService";
import {Address, Transaction} from "@signumjs/core";
import {ChainTime} from "@signumjs/util";
import {PendingTransactionCard} from "@/ui/components/Cards/PendingTransactionCard";
import {parseRegisterIncomingMaterialMessage} from "@/common/transactionParser";
import {useFormatter, useTranslations} from "next-intl";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";

const SinceMinutesAgo = 12;

function IncomingMaterialTransaction({transaction}: { transaction: Transaction }) {
    const t = useTranslations("materials")
    const {number} = useFormatter();
    const {stockContracts} = useUserAccount();
    const parsed = parseRegisterIncomingMaterialMessage(transaction)
    if (!parsed) return null;

    const contract = stockContracts.find(({id}) => id === transaction.recipient)

    if (!contract) return null;

    return <LabeledTextItem label={t(`${contract.label.toLowerCase()}.description`)}
                            text={`${number(parsed.quantity)} kg`}/>
}

export function PendingSeparatedMaterial() {
    const {stockContracts, publicKey} = useUserAccount();
    const ledgerService = useLedgerService()

    const {data: transactions = []} = useSWR(`fetch/accounts/${publicKey}/transactions`, async () => {
        const senderId = Address.fromPublicKey(publicKey).getNumericId();
        const timestamp = ChainTime.fromDate(new Date(Date.now() - SinceMinutesAgo * 60 * 1000)).getChainTimestamp(); // since last twelve minutes
        const allStockContractTransactions = await Promise.all(stockContracts.map(({id}) => ledgerService.fetchTransactionFromTo({
            senderId,
            receiverId: id,
            includePending: true,
            timestamp
        })))
        const stockContractTransactions = allStockContractTransactions.flat();
        return stockContractTransactions.filter(tx => parseRegisterIncomingMaterialMessage(tx) !== null);
    }, {refreshInterval: 10_000})


    return <div className="flex flex-col w-full gap-y-2">
        {transactions.map(transaction => <PendingTransactionCard
                key={transaction.transaction}
                transaction={transaction}
                blocksToWait={1}
            >
                <IncomingMaterialTransaction transaction={transaction}/>
            </PendingTransactionCard>
        )
        }
    </div>
}


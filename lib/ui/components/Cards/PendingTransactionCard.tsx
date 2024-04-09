"use client";

import {Transaction} from "@signumjs/core";
import React, {useMemo} from "react";
import {SimpleCard} from "./SimpleCard";
import {useTranslations, useFormatter, useNow} from "next-intl";
import {useAppContext} from "@/ui/hooks/useAppContext";
import {ChainTime} from "@signumjs/util";
import {ChildrenProps} from "@/types/childrenProps";

interface Props extends ChildrenProps{
    transaction: Transaction,
    blocksToWait?: number; // starts at 0 -> immediately after pending was confirmed
}

export function PendingTransactionCard({ transaction, children, blocksToWait = 0 }: Props) {
    const  {Ledger: { ExplorerUrl }} = useAppContext();
    const t = useTranslations("transaction.pending");
    const {relativeTime} = useFormatter();

    const estimatedSettlement = useMemo(() => {
        const txTimestamp = ChainTime.fromChainTimestamp(transaction.timestamp).getDate().getTime();
        const AvgBlockTimeMillies = 4 * 60 * 1000;
        // confirmations starts at 0
        return new Date(txTimestamp + (blocksToWait + 1) * AvgBlockTimeMillies);
    }, [blocksToWait, transaction])

    const now =  useNow({
        updateInterval: 1000
    })

    // confirmations starts at 0
    if(transaction.confirmations !== undefined && transaction.confirmations >= blocksToWait )  {
        return null;
    }

    return <SimpleCard title={t("title")} href={{url: `${ExplorerUrl}/tx/${transaction.transaction}`, label: t("see_in_explorer"), inNewTab: true}}>
        {children}
        <div className="animate-pulse py-1 text-sm mt-1">{t("est_settlement")}: {relativeTime(estimatedSettlement, now)}</div>
    </SimpleCard>;
}
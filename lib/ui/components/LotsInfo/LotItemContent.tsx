"use client"

import React from "react";
import Link from "next/link";
import {useFormatter, useTranslations} from "next-intl";
import {Address} from "@signumjs/core";
import {LotReceiptData} from "@veridibloc/smart-contracts";
import {useAppContext} from "@/ui/hooks/useAppContext";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";

interface ItemProps{
    receipt:LotReceiptData
}

export function LotItemContent({receipt}: ItemProps){
    const t = useTranslations("common.lot_receipt_info");
    const {number, dateTime} = useFormatter();
    const {Ledger : {ExplorerUrl}} = useAppContext();
    const {lotId, date, quantity, contractId, receiptId} = receipt
    return (
        <p className="text-gray-800 dark:text-gray-200">
            <div>
                <LabeledTextItem label={t("initial_weight")} text={`${number(quantity)} kg`}/>
            </div>
            <div>
                <LabeledTextItem label={t("delivery_date")}
                                 text={dateTime(date, {dateStyle: "short", timeStyle: "long"})}/>
            </div>
            <div>
                <LabeledTextItem label={t("lot")}>
                    <Link href={`${ExplorerUrl}/tx/${lotId}`} rel="noopener noreferrer"
                          target="_blank">
                        <div className="underline text-blue-600 dark:blue-400">{lotId}</div>
                    </Link>
                </LabeledTextItem>
            </div>
            <div>
                <LabeledTextItem label={t("sender")}>
                    {/* sender is actually the stock contract from the previous partner */}
                    <Link href={`${ExplorerUrl}/address/${contractId}`} rel="noopener noreferrer"
                          target="_blank">
                        <div
                            className="underline text-blue-600 dark:blue-400">{Address.fromNumericId(contractId).getReedSolomonAddress()}</div>
                    </Link>
                </LabeledTextItem>
            </div>
            <div>
                <LabeledTextItem label={t("receipt_id")}>
                    <Link href={`${ExplorerUrl}/tx/${receiptId}`} rel="noopener noreferrer"
                          target="_blank">
                        <div className="underline text-blue-600 dark:blue-400">{receiptId}</div>
                    </Link>
                </LabeledTextItem>
            </div>

        </p>
    )
}
"use client"

import {LotReceiptData} from "@veridibloc/smart-contracts";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {useFormatter, useTranslations} from "next-intl";
import {Address} from "@signumjs/core";
import React from "react";
import {useAppContext} from "@/ui/hooks/useAppContext";
import Link from "next/link";

interface Props {
    lotReceipt: LotReceiptData
}

export const SingleLotInfo = ({lotReceipt}: Props) => {
    const t = useTranslations("outgoing.confirm_multilot.lot_receipt_info");
    const {Ledger: {ExplorerUrl}} = useAppContext();
    const {number, dateTime} = useFormatter();
    const {lotId, date, confirmedQuantity} = lotReceipt
    const idBase = `sli-${lotId}`
    return (
        <div
            id={`${idBase}-heading`}
            className="hs-accordion hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-gray-800 dark:border-gray-700 px-4 py-1"
        >
            <button
                className="hs-accordion-toggle hs-accordion-active:text-blue-500 py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
                aria-controls={`${idBase}-collapse`}>
                <LabeledTextItem label={t("weight")} text={`${number(confirmedQuantity)} kg`}/>
                <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                </svg>
                <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     strokeLinecap="round" strokeLinejoin="round">
                    <path d="m18 15-6-6-6 6"/>
                </svg>
            </button>
            <div id={`${idBase}-collapse`}
                 className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                 aria-labelledby={`${idBase}-heading`}>
                <p className="text-gray-800 dark:text-gray-200">
                    <div>
                        <LabeledTextItem label={t("lot")}>
                            <Link href={`${ExplorerUrl}/tx/${lotReceipt.lotId}`} rel="noopener noreferrer"
                                  target="_blank">
                                <div className="underline text-blue-600 dark:blue-400">{lotReceipt.lotId}</div>
                            </Link>
                        </LabeledTextItem>
                    </div>
                    <div>
                        <LabeledTextItem label={t("creation_date")}
                                         text={dateTime(date, {dateStyle: "short", timeStyle: "long"})}/>
                    </div>
                    <div>
                        <LabeledTextItem label={t("sender")}>
                            {/* sender is actually the stock contract from the previous partner */}
                            <Link href={`${ExplorerUrl}/address/${lotReceipt.contractId}`} rel="noopener noreferrer"
                                  target="_blank">
                                <div
                                    className="underline text-blue-600 dark:blue-400">{Address.fromNumericId(lotReceipt.contractId).getReedSolomonAddress()}</div>
                            </Link>
                        </LabeledTextItem>
                    </div>
                    <div>
                        <LabeledTextItem label={t("receipt_id")}>
                            <Link href={`${ExplorerUrl}/tx/${lotReceipt.receiptId}`} rel="noopener noreferrer"
                                  target="_blank">
                                <div className="underline text-blue-600 dark:blue-400">{lotReceipt.receiptId}</div>
                            </Link>
                        </LabeledTextItem>
                    </div>

                </p>
            </div>
        </div>
    )

}
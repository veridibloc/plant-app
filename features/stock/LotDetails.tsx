"use client";

import {LotData} from "@veridibloc/smart-contracts";
import {Header} from "@/ui/components/Layout/Header";
import {useFormatter, useTranslations} from "next-intl";
import QRCode from "react-qr-code";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {MaterialCard} from "@/ui/components/Materials";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {useEffect} from "react";
import {contractsProvider} from "@/common/contractsProvider";
interface Props {
    stockContractId: string,
    lotData: LotData,
    lotReceipt?: string
}

export function LotDetails({lotData, stockContractId, lotReceipt}: Props) {
    const t = useTranslations("stock.lot")
    const {number, dateTime} = useFormatter();
    const {stockContracts} = useUserAccount()

    const materialSlug = stockContracts.find(({label, id}) => id === stockContractId)!.label
    const lotId = lotData.id;
    const identifier = new ScannableIdentifier({type: "vb", parts: [stockContractId, lotId]}).toString()

    useEffect(() => {

        if(lotReceipt){
            contractsProvider.ledger.transaction.getTransaction(lotReceipt).then((tx) => {

            }).catch(console.error)
        }

    }, [lotReceipt]);

    return <div className="space-y-2 px-2">
        <Header title={t("title")} description={t("description", {lotId})}/>
        <MaterialCard materialSlug={materialSlug} id={lotId} weight={lotData.totalQuantity} showWeight={true}/>
        <section className="block mx-auto text-center w-full gap-x-4">
                <QRCode
                    size={160}
                    style={{
                        maxWidth: "100%",
                        width: "100%",
                        padding: "0.5rem",
                    }}
                    viewBox={`0 0 128 128`}
                    value={identifier}
                />
                <small className="text-xs dark:text-gray-300 text-gray-500 mx-auto">{identifier}</small>
        </section>
        <hr className="w-full"/>
        <section>
            <div className="flex flex-col w-full gap-2 border-gray-300 border rounded p-4">
                <div>
                    <LabeledTextItem label={t("weight")} text={`${number(lotData.totalQuantity)} kg`}/>
                </div>
                <div>
                    <LabeledTextItem label={t("creation_date")} text={dateTime(lotData.date, {dateStyle: "short"})}/>
                </div>
                {/*{lotReceipt && (*/}
                {/*    <div>*/}
                {/*        <LabeledTextItem label={t("delivery_date")} text={}/>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </section>
        <hr className="w-full"/>
        <section className="border rounded border-gray-300 relative px-4 py-8 mt-4">
            <div
                className="absolute text-xs top-[-8px] bg-white dark:bg-gray-800 text-gray-500 px-1">{t("composition")}</div>

            {/*<Table rows={rows} headers={*/}
            {/*    [*/}
            {/*        {id: "transaction", content: t("proof")},*/}
            {/*        {id: "quantity", content: t("quantity")},*/}
            {/*        {id: "date", content: t("separation-date")},*/}
            {/*        {id: "actions", content: tc("actions")},*/}
            {/*    ]*/}
            {/*}/>*/}
        </section>
    </div>
}
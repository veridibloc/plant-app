"use client";

import {LotData, LotReceiptData} from "@veridibloc/smart-contracts";
import {Header} from "@/ui/components/Layout/Header";
import {useFormatter, useTranslations} from "next-intl";
import QRCode from "react-qr-code";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {MaterialCard} from "@/ui/components/Materials";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {RiPrinterLine} from "react-icons/ri";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {Printable} from "@/ui/components/PrintLot/Printable";
import {LotPartItem} from "@/features/stock/components/LotPartItem";

interface Props {
    stockContractId: string,
    lotData: LotData,
    lotReceiptData?: LotReceiptData
}

export function LotDetails({lotData, stockContractId, lotReceiptData}: Props) {
    const tc = useTranslations("common")
    const t = useTranslations("stock.lot")
    const {number, dateTime} = useFormatter();
    const {stockContracts} = useUserAccount()

    const handlePrint = () => {
        window.print()
    }

    const materialSlug = stockContracts.find(({label, id}) => id === stockContractId)!.label
    const lotId = lotData.id;
    const identifier = new ScannableIdentifier({type: "vb", parts: [stockContractId, lotId]}).toString()


    return <>
        <Printable materialLabel={materialSlug} identifier={identifier} stockContractId={stockContractId}
                   weight={lotData.totalQuantity}/>
        <section className="print:hidden space-y-2 px-2 mx-auto w-full">
            <Header title={t("title")} description={t("description", {lotId})}/>
            <MaterialCard materialSlug={materialSlug} id={stockContractId} weight={lotData.totalQuantity}
                          showWeight={true}/>
            <section className="print:hidden flex flex-col mx-auto text-center">
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
                <IconButton
                    icon={<RiPrinterLine size={20} color="#2563EB"/>}
                    label={tc("print")}
                    onClick={handlePrint}
                    labelClassName="text-blue-600"
                    className="bg-transparent text-blue-600 text-sm font-semibold rounded-lg border border-transparent hover:!bg-blue-100 hover:text-blue-800 focus:!ring-0 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:!bg-blue-100/30 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:!ring-0"
                />
            </section>
            <section>
                <div className="flex flex-col w-full gap-2 border-gray-300 border rounded p-4">
                    <div>
                        <LabeledTextItem label={t("weight")} text={`${number(lotData.totalQuantity)} kg`}/>
                    </div>
                    <div>
                        <LabeledTextItem label={t("creation_date")}
                                         text={dateTime(lotData.date, {dateStyle: "short", timeStyle: "long"})}/>
                    </div>
                    {lotReceiptData ? (
                        <>
                            <div>
                                <LabeledTextItem label={t("delivery_date")}
                                                 text={dateTime(lotReceiptData.date, {
                                                     dateStyle: "short",
                                                     timeStyle: "long"
                                                 })}/>
                            </div>
                            <div>
                                <LabeledTextItem label={t("confirmed_weight")}
                                                 text={`${number(lotReceiptData.confirmedQuantity)} kg`}/>
                            </div>
                        </>
                    ) : (
                        <div>
                            <LabeledTextItem label={t("delivery_date")}
                                             text={t("not_delivered_yet")}/>
                        </div>

                    )}
                </div>
            </section>

            <section className="border rounded border-gray-300 relative px-4 py-4 !mt-4 space-y-2">
                <div className="absolute text-xs top-[-8px] bg-white dark:bg-gray-800 text-gray-500 px-1">{t("composition")}</div>
                {lotData.lotParts.map(({tx, quantity}) => <LotPartItem key={`ltp-${tx}`} txId={tx} quantity={quantity} />)}
            </section>
        </section>
    </>
}
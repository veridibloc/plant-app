import {LotData} from "@veridibloc/smart-contracts";
import {MaterialCard} from "@/ui/components/Materials";
import QRCode from "react-qr-code";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useFormatter, useTranslations} from "next-intl";

interface Props {
    materialSlug: string;
    stockContractId: string,
    lotData: LotData
}

export function LotDetails ({ lotData, stockContractId, materialSlug }: Props) {
    const  t = useTranslations("incoming.confirmation.lot");
     const {number, dateTime} = useFormatter();
    const {id, date, lotParts, totalQuantity} = lotData
    const identifier = new ScannableIdentifier({type: "vb", parts: [stockContractId, id]}).toString()

    return <>
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
        </section>
        <section className="w-full">
            <div className="flex flex-col w-full gap-2 border-gray-300 border rounded p-4">
                <div>
                    <LabeledTextItem label={t("weight")} text={`${number(lotData.totalQuantity)} kg`}/>
                </div>
                <div>
                    <LabeledTextItem label={t("creation_date")}
                                     text={dateTime(lotData.date, {dateStyle: "short", timeStyle: "long"})}/>
                </div>
                {/*{lotReceiptData ? (*/}
                {/*    <>*/}
                {/*        <div>*/}
                {/*            <LabeledTextItem label={t("delivery_date")}*/}
                {/*                             text={dateTime(lotReceiptData.date, {*/}
                {/*                                 dateStyle: "short",*/}
                {/*                                 timeStyle: "long"*/}
                {/*                             })}/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <LabeledTextItem label={t("confirmed_weight")}*/}
                {/*                             text={`${number(lotReceiptData.confirmedQuantity)} kg`}/>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <LabeledTextItem label={t("delivery_date")}*/}
                {/*                         text={t("not_delivered_yet")}/>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </section>

    </>
}
import {LotData} from "@veridibloc/smart-contracts";
import {MaterialCard} from "@/ui/components/Materials";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {useFormatter, useTranslations} from "next-intl";

interface Props {
    materialSlug: string;
    stockContractId: string,
    lotData: LotData
}

export function LotInfo ({ lotData, stockContractId, materialSlug }: Props) {
    const  t = useTranslations("incoming.confirmation.lot");
     const {number, dateTime} = useFormatter();
    return <>
        <MaterialCard materialSlug={materialSlug} id={stockContractId} weight={lotData.totalQuantity}
                      showWeight={true}/>
        <section className="w-full flex flex-col gap-x-2 gap-y-1 border-gray-300 border rounded p-4 bg-white dark:bg-gray-600">
                <div>
                    <LabeledTextItem label={t("lot")} text={lotData.id}/>
                </div>
                <div>
                    <LabeledTextItem label={t("announced_weight")} text={`${number(lotData.totalQuantity)} kg`}/>
                </div>
                <div>
                    <LabeledTextItem label={t("creation_date")}
                                     text={dateTime(lotData.date, {dateStyle: "short", timeStyle: "long"})}/>
                </div>
        </section>
    </>
}
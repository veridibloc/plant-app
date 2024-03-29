import {LotReceiptData} from "@veridibloc/smart-contracts";
import {LabeledTextItem} from "@/ui/components/LabeledTextItem";
import {useFormatter, useTranslations} from "next-intl";

interface Props {
    lotReceipt: LotReceiptData
}
export const SingleLotInfo = ({lotReceipt}: Props) => {
    const t = useTranslations("outcoming.confirm_multilot.lot_receipt_info");
    const {number, dateTime} = useFormatter();
    const {lotId, date, confirmedQuantity} = lotReceipt
    return <section
            className="w-full flex flex-col gap-x-2 gap-y-1 border-gray-300 border rounded p-4 bg-white dark:bg-gray-600">
        <div>
            <LabeledTextItem label={t("lot")} text={lotId}/>
        </div>
        <div>
            <LabeledTextItem label={t("weight")} text={`${number(confirmedQuantity)} kg`}/>
        </div>
        <div>
            <LabeledTextItem label={t("creation_date")}
                             text={dateTime(date, {dateStyle: "short", timeStyle: "long"})}/>
        </div>
    </section>
}
"use client"

import {LotReceiptsInfo as LotsInfoComponent} from "@/features/outgoing/components/LotReceiptsInfo";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {StockInfo} from "@/types/stockInfo";
import {LotReceiptsInfo} from "@/types/lotReceiptsInfo";
import {MaterialCard} from "@/ui/components/Materials";
import {RiArrowDownLine} from "react-icons/ri";
import {useFormState} from "react-dom";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useNotification} from "@/ui/hooks/useNotification";

interface Props {
    lotsInfo: LotReceiptsInfo;
    stockInfo: StockInfo;
    createLotAction: any;
}

export function MultiLotsConfirmationForm({lotsInfo, stockInfo, createLotAction}: Props) {
    const t = useTranslations("common");
    const to = useTranslations("outgoing.confirm_multilot");
    const [state, action] = useFormState<any>(createLotAction, {});
    const [submitSuccessful, setSubmitSuccessful] = useState(false)
    const {showError, showSuccess} = useNotification();

    useEffect(() => {
        if (state.success) {
            setSubmitSuccessful(true);
            showSuccess(to("creation_success"));
        }

        if (state.error) {
            console.error(state.error);
            showError(to("creation_failed"));
        }

    }, [state]);

    return <>
        <section className="flex flex-col items-center justify-center w-full gap-y-2">
            <LotsInfoComponent lotsInfo={lotsInfo}/>
            <RiArrowDownLine size={48} color="#6b7280"/>
            <MaterialCard materialSlug={stockInfo.materialSlug} id={stockInfo.stockContractId}/>
        </section>
        <section className="w-full">

        <form action={action}>
            <input name="lotIds" defaultValue={lotsInfo.receipts.map(l => l.lotId).join(",")} hidden/>
            <input name="separatorContractId" defaultValue={lotsInfo.materialId} hidden/>
            <input name="stockContractId" defaultValue={stockInfo.stockContractId} hidden/>
            <div className="mx-auto w-full h-20 flex items-center justify-center">
                <FormSubmitButton
                    className={`w-1/2 lg:w-1/3 transition-all ease-in ${submitSuccessful ? "hover:bg-green-600 bg-green-500" : ""}`}
                    label={submitSuccessful ? t("success") : t("confirm")}/>
            </div>
        </form>
        </section>
    </>
}

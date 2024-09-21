"use client"

import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {StockInfo} from "@/types/stockInfo";
import {MaterialCard} from "@/ui/components/Materials";
import {RiArrowDownLine} from "react-icons/ri";
import {useFormState} from "react-dom";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {useNotification} from "@/ui/hooks/useNotification";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {LotsInfo} from "@/ui/components/LotsInfo";
import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {SingleLotReceiptInfo} from "@/types/singleLotReceiptInfo";
import {FormStateResponse} from "@/types/formStateResponse";

interface Props {
    lotInfo: SingleLotReceiptInfo;
    stockInfo: StockInfo;
    createLotAction: any;
}

const initialFormValues = {
    weight: ""
}

export function SingleLotConfirmationForm({lotInfo, stockInfo, createLotAction}: Props) {
    const t = useTranslations("common");
    const tlw = useTranslations("outgoing.confirm_lot_and_weight");
    const router = useEnhancedRouter()
    const [createLotResult, createLot] = useFormState<FormStateResponse & {
        lotId: string,
    }>(createLotAction, {lotId: ""});
    const [fieldValues, setFieldValues] = useState(initialFormValues);
    const [submitSuccessful, setSubmitSuccessful] = useState(false)
    const {showError, showSuccess} = useNotification();

    useEffect(() => {
        if (createLotResult.success) {
            setSubmitSuccessful(true);
            showSuccess(tlw("creation_success"));
            router.replace(`/outgoing/c/${stockInfo.stockContractId}/${createLotResult.lotId}?w=${fieldValues.weight}`)
        }

        if (createLotResult.error) {
            console.error(createLotResult.error);
            showError(tlw("creation_failed", {reason: createLotResult.error}));
        }

    }, [createLotResult]);

    const numericWeight = Number(fieldValues.weight || "0");
    const canSubmit = numericWeight > 0 && numericWeight <= lotInfo.receipt.confirmedQuantity
    return <>
        <section className="flex flex-col items-center justify-center w-full gap-y-2">
            <LotsInfo lotsInfo={{
                materialId: lotInfo.materialId,
                materialSlug: lotInfo.materialSlug,
                receipts: [lotInfo.receipt]
            }}/>
            <RiArrowDownLine size={48} color="#6b7280"/>
            <MaterialCard materialSlug={stockInfo.materialSlug} id={stockInfo.stockContractId}/>
        </section>
        <section className="w-full">
            <form className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={createLot}>
                <input name="lotId" defaultValue={lotInfo.receipt.lotId} hidden/>
                <input name="stockContractId" defaultValue={stockInfo.stockContractId} hidden/>
                <div className="inline-flex relative items-center w-full">
                    <div className="grow">
                        <IntegerNumberInput
                            label={tlw("enter_weight")}
                            placeholder={tlw("enter_weight")}
                            name="weight"
                            value={fieldValues.weight}
                            onChange={(weight) => {
                                setSubmitSuccessful(false);
                                setFieldValues(prevState => ({
                                    ...prevState,
                                    weight: weight.toString()
                                }))
                            }}
                            withButtons={false}
                            min={0}
                            max={lotInfo.receipt.confirmedQuantity}
                            autocompletion="off"
                            aria-autocomplete="none"
                        />
                    </div>
                    <small
                        className="absolute text-lg text-gray-500 dark:text-gray-200 right-2 top-[28px]">kg</small>
                </div>
                <div className="mx-auto w-full h-20 flex items-center justify-center">
                    <FormSubmitButton
                        disabled={!canSubmit}
                        className={`w-1/2 lg:w-1/3 transition-all ease-in ${submitSuccessful ? "hover:bg-green-600 bg-green-500" : ""}`}
                        label={submitSuccessful ? t("success") : t("confirm")}
                    />
                </div>
            </form>
        </section>
    </>
}

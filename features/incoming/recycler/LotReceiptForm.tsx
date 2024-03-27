"use client"

import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {useFormState} from "react-dom";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {useNotification} from "@/ui/hooks/useNotification";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {RiCheckboxCircleFill} from "react-icons/ri";


interface Props {
    contractId: string;
    lotId: string;
    quantity: number;
    registerLotAction: any;
}

export const LotReceiptForm = ({contractId, lotId, quantity: nominalQuantity, registerLotAction}: Props) => {
    const t = useTranslations("common");
    const ti = useTranslations("incoming");
    const {showSuccess, showError} = useNotification();
    const [state, action] = useFormState<any>(registerLotAction, {});
    const [quantity, setQuantity] = useState(nominalQuantity);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);

    useEffect(() => {
        if (state.success) {
            setSubmitSuccessful(true);
            showSuccess(ti("confirmation.lot.registration_successful"));
        }

        if (state.error) {
            console.error(state.error);
            showError(ti("confirmation.lot.registration_failed"));
        }

    }, [state]);


    const canSubmit = Number(quantity);
    return (
        <form className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={action}>
            <input name="lotId" defaultValue={lotId} hidden/>
            <input name="contractId" defaultValue={contractId} hidden/>
            {!submitSuccessful && (
                <div className="inline-flex relative items-center w-full">
                    <div className="grow">
                        <IntegerNumberInput
                            label={ti("confirmation.lot.enter_actual_weight")}
                            placeholder={ti("confirmation.lot.enter_actual_weight")}
                            name="quantity"
                            value={quantity}
                            onChange={setQuantity}
                            withButtons={false}
                            min={0}
                            max={nominalQuantity}
                            autocompletion="off"
                            aria-autocomplete="none"
                            disabled={submitSuccessful}
                        />
                    </div>
                    <small className="absolute text-lg text-gray-500 dark:text-gray-200 right-2 top-[28px]">kg</small>
                </div>
            )}

            {submitSuccessful && (
                <SimpleCard title={ti("confirmation.lot.lot_registered")} href={{url: "/incoming", label: ti("confirmation.lot.register_more")}}>
                    <div className="flex flex-row gap-x-2 justify-center items-center w-full">
                        <RiCheckboxCircleFill color="green" size={48} />
                        <p>{ti("confirmation.lot.registration_success")}</p>
                    </div>
                </SimpleCard>
            )}
            <div className="mx-auto w-full h-20 flex items-center justify-center">
                <FormSubmitButton
                    className={`w-1/2 lg:w-1/3 transition-all ease-in ${submitSuccessful ? "hover:bg-green-600 bg-green-500" : ""}`}
                    label={submitSuccessful ? t("success") : t("confirm")}
                    disabled={!canSubmit}
                />
            </div>
        </form>
    )
}
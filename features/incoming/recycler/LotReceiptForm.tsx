"use client"

import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {useFormState} from "react-dom";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import {useNotification} from "@/ui/hooks/useNotification";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {RiCheckboxCircleFill} from "react-icons/ri";
import {Select} from "@/ui/components/Select";
import {useUserAccount} from "@/ui/hooks/useUserAccount";

const initialFormValues = {
    recyclerContractId: "",
    quantity: 0
}

interface Props {
    contractId: string;
    lotId: string;
    quantity: number;
    registerLotAction: any;
}

export const LotReceiptForm = ({contractId, lotId, quantity: nominalQuantity, registerLotAction}: Props) => {
    const t = useTranslations("common");
    const ti = useTranslations("incoming");
    const tm = useTranslations("materials");
    const {showSuccess, showError} = useNotification();
    const {stockContracts} = useUserAccount()
    const [state, action] = useFormState<any>(registerLotAction, {});
    const [fieldValues, setFieldValues] = useState(initialFormValues);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);
    const handleOnChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        setSubmitSuccessful(false);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }

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

    const canSubmit = Number(fieldValues.recyclerContractId) && Number(fieldValues.quantity);
    return (
        <form className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={action}
              onChange={handleOnChange}>
            <input name="lotId" defaultValue={lotId} hidden/>
            <input name="separatorContractId" defaultValue={contractId} hidden/>
            {!submitSuccessful && (<>
                    <Select name="recyclerContractId" label={ti("select_target_stock")} onChange={() => {
                    }}>
                        <option value="0">-- {ti("select_target_stock")} --</option>
                        {stockContracts.map(({label, id}) => <option key={id} value={id}>{tm(`${label.toLowerCase()}.description`)}</option>)}
                    </Select>

                    <div className="inline-flex relative items-center w-full">
                        <div className="grow">
                            <IntegerNumberInput
                                label={ti("confirmation.lot.enter_actual_weight")}
                                placeholder={ti("confirmation.lot.enter_actual_weight")}
                                name="quantity"
                                value={fieldValues.quantity}
                                onChange={() => {
                                }}
                                withButtons={false}
                                min={0}
                                max={nominalQuantity}
                                autocompletion="off"
                                aria-autocomplete="none"
                                disabled={submitSuccessful}
                            />
                        </div>
                        <small
                            className="absolute text-lg text-gray-500 dark:text-gray-200 right-2 top-[28px]">kg</small>
                    </div>
                </>
            )}

            {submitSuccessful && (
                <SimpleCard title={ti("confirmation.lot.lot_registered")}
                            href={{url: "/incoming", label: ti("confirmation.lot.register_more")}}>
                    <div className="flex flex-row gap-x-2 justify-center items-center w-full">
                        <RiCheckboxCircleFill color="green" size={48}/>
                        <p>{ti("confirmation.lot.registration_success")}</p>
                    </div>
                </SimpleCard>
            )}
            <div className="mx-auto w-full h-20 flex items-center justify-center">
                <FormSubmitButton
                    className={`w-1/2 lg:w-1/3 transition-all ease-in ${submitSuccessful ? "hover:!bg-green-600 !bg-green-500" : ""}`}
                    label={submitSuccessful ? t("success") : t("confirm")}
                    disabled={!canSubmit || submitSuccessful}
                />
            </div>
        </form>
    )
}
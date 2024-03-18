"use client"

import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useFormState} from "react-dom";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {MaterialCard} from "@/ui/components/Materials";
import {useSingleStockContract} from "@/ui/hooks/useSingleStockContract";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import { notFound } from "next/navigation";
import {useNotification} from "@/ui/hooks/useNotification";


const initialFormValues = {
    material: "",
    weight: 0
}

interface Props {
    materialId: string;
    createLotAction: any;
}

export const LotByWeightForm = ({materialId, createLotAction}: Props) => {
    const formRef = useRef<any>();
    const t = useTranslations("common");
    const to = useTranslations("outgoing.confirm");
    const tm = useTranslations("materials");
    const {showError} = useNotification();
    const router = useEnhancedRouter();
    const {stockContracts} = useUserAccount();
    const {isLoading, contract} = useSingleStockContract(materialId);
    const [state, action] = useFormState<any>(createLotAction, {});
    const [fieldValues, setFieldValues] = useState<{material: string, weight: number}>({material: materialId, weight: 0});
    const [submitSuccessful, setSubmitSuccessful] = useState(false);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            setFieldValues(initialFormValues);
            setSubmitSuccessful(true);
            // TODO: route to QR COde and print!
        }

        if (state.error) {
            console.error(state.error);
            showError(to("creation_failed"))
        }
    }, [state]);


    const canSubmit = Number(fieldValues.material) && Number(fieldValues.weight);

    if(!isLoading && !contract) {
        return notFound();
    }

    const weight = contract?.getData().stockQuantity ?? 0;
    const materialLabel = (stockContracts.find( lstc => lstc.id === materialId)?.label ?? "").toLowerCase();

    return (
        <form ref={formRef} className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={action}>

            <input name="materialId" defaultValue={materialId} hidden/>

            <section className="w-full">
                <MaterialCard label={tm(`${materialLabel}.label`)} description={tm(`${materialLabel}.description`)} id={materialId} showWeight={true} weight={weight}/>
            </section>

            <div className="inline-flex relative items-center w-full">
                <div className="grow">
                    <IntegerNumberInput
                        label={to("enter_weight")}
                        placeholder={to("enter_weight")}
                        name="weight"
                        value={fieldValues.weight}
                        onChange={(weight) => {
                            setSubmitSuccessful(false);
                            setFieldValues(prevState => ({
                                ...prevState,
                                weight: weight
                            }))
                        }}
                        withButtons={false}
                        min={0}
                        max={weight}
                        disabled={Boolean(!contract)}
                        autocompletion="off"
                        aria-autocomplete="none"
                    />
                </div>
                <small className="absolute text-lg text-gray-500 dark:text-gray-200 right-2 top-[28px]">kg</small>
            </div>
            <div className="mx-auto w-full h-20 flex items-center justify-center">
                <FormSubmitButton className={`w-1/2 lg:w-1/3 transition-all ease-in ${submitSuccessful ? "hover:bg-green-600 bg-green-500" : "" }`} label={submitSuccessful ? t("success") : t("confirm")} disabled={!canSubmit}/>
            </div>
        </form>
    )
}
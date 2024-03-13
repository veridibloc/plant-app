"use client"

import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useFormState} from "react-dom";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {useTranslations} from "next-intl";
import {Select} from "@/ui/components/Select";
import {useEffect, useRef, useState} from "react";


const initialFormValues = {
    material: "",
    quantity: 0
}

interface Props {
    collectorId: string;
    registerAction: any;
}

export const CollectorForm = ({collectorId, registerAction}: Props) => {
    const formRef = useRef<any>();
    const t = useTranslations("common");
    const ti = useTranslations("incoming");
    const tm = useTranslations("materials");
    const user = useUserAccount();
    const [state, action] = useFormState<any>(registerAction, {});
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
            formRef.current?.reset();
            setFieldValues(initialFormValues);
            setSubmitSuccessful(true);
        }

        if (state.error) {
            console.error(state.error);
        }

        // # todo toast on error
    }, [state]);


    const canSubmit = Number(fieldValues.material) && Number(fieldValues.quantity);
    return (
        <form ref={formRef} className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={action} onChange={handleOnChange}>

            <input name="collectorId" defaultValue={collectorId} hidden/>

            <Select name="material" label={ti("select_material")} onChange={() => {}}>
                <option value="0">-- {ti("select_material")} --</option>
                {user.collectible.map(({label, id}) => <option key={id} value={id}>{tm(label)}</option>)}
            </Select>

            <div className="inline-flex relative items-center w-full">
                <div className="grow">
                    <IntegerNumberInput
                        label={ti("enter_weight")}
                        placeholder={ti("enter_weight")}
                        name="quantity"
                        value={fieldValues.quantity}
                        onChange={() => {
                        }}
                        withButtons={false}
                        min={0}
                        max={10_000}
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
"use client"

import {IntegerNumberInput} from "@/ui/components/IntegerNumberInput";
import {useFormState} from "react-dom";
import {FormSubmitButton} from "@/ui/components/Buttons/FormSubmitButton";
import {useTranslations} from "next-intl";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNotification} from "@/ui/hooks/useNotification";


const initialFormValues = {
    quantity: ""
}

interface Props {
    materialId: string;
    registerAction: any;
}

export const MaterialQuantityForm = ({materialId, registerAction}: Props) => {
    const formRef = useRef<any>();
    const inputRef = useRef<any>();
    const t = useTranslations("common");
    const ts = useTranslations("separation.register");
    const [state, action] = useFormState<any>(registerAction, {});
    const [fieldValues, setFieldValues] = useState(initialFormValues);
    const [submitSuccessful, setSubmitSuccessful] = useState(false);
    const {showError} = useNotification();
    const handleOnChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        setSubmitSuccessful(false);
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setFieldValues({
            ...fieldValues,
            [fieldName]: fieldValue
        })
    }

    useLayoutEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, [])

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
            setFieldValues(initialFormValues);
            setSubmitSuccessful(true);
        }

        if (state.error) {
            console.error(state.error);
            showError(ts("register_failed"));
        }

        // # todo toast on error
    }, [state]);


    const canSubmit = Number(fieldValues.quantity);
    return (
        <form ref={formRef} className="flex flex-col gap-y-4 justify-evenly items-center w-full h-[40vh]" action={action} onChange={handleOnChange}>

            <input name="materialId" defaultValue={materialId} hidden/>

            <div className="inline-flex relative items-center w-full">
                <div className="grow">
                    <IntegerNumberInput
                        ref={inputRef}
                        label={ts("enter_weight")}
                        placeholder={ts("enter_weight")}
                        name="quantity"
                        value={fieldValues.quantity}
                        onChange={() => {
                            // uses submit onchange handler
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
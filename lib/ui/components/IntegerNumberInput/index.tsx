"use client";
import {
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useRef,
} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    name?: string;
    label?: string;
    step?: number;
    min?: number;
    max?: number;
    withButtons?: boolean;
    value?: number,
    autocompletion?: string;
    onChange: (value: number) => void;
}

function ensureRange(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

export const IntegerNumberInput = forwardRef(({
                                                  value = 0,
                                                  step = 1,
                                                  withButtons = true,
                                                  onChange,
                                                  name,
                                                  label,
                                                  min = Number.MIN_VALUE,
                                                  max = Number.MAX_VALUE,
                                                  ...rest
                                              }: Props, inputRef : ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = Number(e.target.value.replace(/\D/g, ''));
        v = ensureRange(v, min, max);
        onChange(v);
    }
    useEffect(() => {
        ref.current++
    }, [])

    const id = `integer-number-input-${ref.current}`
    return (
        <div>
            {label && <label htmlFor={id} className="block font-medium mb-1 text-xs text-gray-400 ">{label}</label>}
            <div className="py-2.5 px-3 bg-gray-100 rounded-lg dark:bg-slate-700 text-xl h-[50px]" data-hs-input-number>
                <div className="w-full flex justify-between items-center gap-x-5">
                    <div className="grow">
                        <input ref={inputRef}
                               className="p-0 bg-transparent border-0 text-gray-800 dark:text-white w-[90%]"
                               type="number"
                               name={name}
                               id={id}
                               value={value}
                               onChange={handleOnChange}
                               {...rest}
                               data-hs-input-number-input
                        />
                    </div>
                    {withButtons && (
                        <div className="flex justify-end items-center gap-x-1.5">
                            <button type="button"
                                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    data-hs-input-number-decrement>
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                </svg>
                            </button>
                            <button type="button"
                                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    data-hs-input-number-increment>
                                <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"/>
                                    <path d="M12 5v14"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})
IntegerNumberInput.displayName = "IntegerNumberInput";
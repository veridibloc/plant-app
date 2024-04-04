"use client";
import {
    ForwardedRef,
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useRef,
} from "react";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    autocompletion?: string;
    debounceDelay?: number;
    onChange: (value: string) => void;
}

export const TextInput = forwardRef(({
                                         onChange,
                                         label,
                                         ...rest
                                     }: Props, inputRef: ForwardedRef<HTMLInputElement>) => {
    const ref = useRef(0);

    useEffect(() => {
        ref.current++
    }, [])

    const id = `text-input-${ref.current}`
    return (
        <>
            {label && <label htmlFor={id} className="block font-medium mb-1 text-xs text-gray-400 ">{label}</label>}
            <input ref={inputRef}
                   id={id}
                   type="text"
                   className="py-3 px-4 block w-full border-gray-200 border rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                   onChange={e => onChange(e.target.value)}
                   {...rest}
            />
        </>
    )
})
TextInput.displayName = "TextInput";
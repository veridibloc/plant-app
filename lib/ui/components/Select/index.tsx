import {HtmlHTMLAttributes, useEffect, useRef} from 'react';


interface Props extends HtmlHTMLAttributes<HTMLSelectElement> {
    label?: string
    name?: string
}

export const Select = ({children, className = "", label, name, ...rest}: Props) => {
    const ref = useRef(0);
    useEffect(() => {
        ref.current++
    }, [])

    const id = `dropdown-${ref.current}`
    return <div className="w-full">
        {label && <label htmlFor={id} className="block font-medium mb-1 text-xs text-gray-400">{label}</label>}
        <select id={id}
                name={name}
                className={`py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-xl focus:border-blue-500 focus:ring-blue-500 bg-gray-100 dark:bg-slate-800 dark:border-gray-700 text-gray-800 dark:text-white ${className}`}
                {...rest}
        >
            {children}
        </select>
    </div>
}

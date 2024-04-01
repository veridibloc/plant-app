import {ChildrenProps} from "@/types/childrenProps";

interface Props  extends ChildrenProps {
    label: string
    text?: string
    labelClassName?: string
    textClassName?: string
}
export const LabeledTextItem = ({text = "", label, textClassName = "", labelClassName = "", children}: Props) => {

    return (
        <div className="relative">
            <label htmlFor={`ti-${label}`} className={`text-xs dark:text-gray-300 text-gray-500 ${labelClassName}`}>{label}</label>
            {children
                ? <div>{children}</div>
                : <p id={`ti-${label}`} className={`dark:text-gray-200 text-gray-700 ${textClassName}`}>{text}</p>
            }
        </div>
    )
}

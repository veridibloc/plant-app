import {ReactNode} from "react";

interface Props {
    title: string | ReactNode;
    description?: string | ReactNode;
}

export const Header = ({title, description}: Props) => {

    return <div className="print:hidden w-full">
        <header className="font-bold text-center text-lg">{title}</header>
        <div className="mx-auto lg:w-1/2 ">
        {description && (typeof(description) === "string") && <p className={`px-6 py-1 text-md ${description.length > 100 ? "text-justify" : "text-center"} text-gray-400`}>{description}</p>}
        {description && (typeof(description) !== "string") && <>{description}</>}
        </div>
    </div>
}
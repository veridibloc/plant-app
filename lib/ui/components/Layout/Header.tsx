interface Props{
    title: string;
    description?: string;
}
export const Header = ({title, description}: Props) => {
    return <div className="print:hidden">
        <header className="font-bold w-full text-center text-lg">{title}</header>
        {description && <p className="px-6 py-1 mx-auto text-md text-justify text-gray-400">{description}</p>}
        </div>
}
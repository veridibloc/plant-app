// @ts-ignore
import ColorHash from "color-hash";
import {useFormatter}  from "next-intl"

interface Props {
    label: string;
    description: string;
    id: string;
    weight?: number;
    onClick?: (id: string) => void;
}

const colorHash = new ColorHash()
export const MaterialCard = ({label, id, description, onClick, weight}: Props) => {
    const {number} = useFormatter();
    const bgColor = colorHash.hex(label);

    const handleClick  = () => {
        onClick && onClick(id);
    }

    return (
        <div className={`flex flex-row border shadow-sm rounded-xl p-4 justify-start items-center space-x-2 bg-white ${onClick ? "hover:bg-gray-200 cursor-pointer" : ""}`} onClick={handleClick}>
            <span
                className="w-14 h-14 rounded-full flex justify-center items-center text-md font-bold text-gray-200"
                style={{backgroundColor: bgColor}}
            >
                {label.toUpperCase()}
            </span>
            <div className="truncate">
                <h3 className="text-lg font-bold text-gray-700 mb-0.5 truncate">{description}</h3>
                <small className="font-small text-gray-500 text-justify">
                    {id}
                </small>
            </div>
            {weight !== undefined && (
            <div className="border rounded text-gray-700 font-medium">
                {number(1000)} kg
            </div>
            )}
        </div>
    )
}
// @ts-ignore
import ColorHash from "color-hash";
import {useFormatter, useTranslations} from 'next-intl';

const colorHash = new ColorHash()

export interface MaterialCardProps {
    id: string;
    label: string;
    quantity: number;
    onClick: (id:string) => void;
}

export const MaterialCard = ({label, id, quantity, onClick}: MaterialCardProps) => {
    const t = useTranslations("materials");
    const {number} = useFormatter()
    const bgColor = colorHash.hex(label);

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl justify-center items-center w-full" onClick={ () => onClick(id) }>
            <span
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex justify-center items-center text-md font-bold text-gray-200"
                style={{backgroundColor: bgColor}}
            >
                {label.toUpperCase()}
            </span>
            <span className="flex flex-row items-baseline">
                <h3 className="text-lg font-bold text-gray-800">{number(quantity, {maximumFractionDigits: 0})}</h3>
                <small className="font-medium text-gray-500 ml-1">kg</small>
            </span>
        </div>
    );
};

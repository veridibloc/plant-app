"use client";
// @ts-ignore
import ColorHash from "color-hash";
import {useFormatter, useTranslations} from "next-intl"

export interface MaterialCardProps {
    materialSlug: string;
    id: string;
    weight?: number;
    showWeight?: boolean;
    onClick?: (id: string) => void;
}

const colorHash = new ColorHash()
export const MaterialCard = ({materialSlug, id, onClick, weight, showWeight = false}: MaterialCardProps) => {
    const {number} = useFormatter();
    const tm = useTranslations("materials");
    const material = materialSlug.toLowerCase();
    const bgColor = colorHash.hex(material);

    const handleClick = () => {
        onClick && onClick(id);
    }

    return (
        <div
            className={`flex flex-row border shadow-sm w-full rounded-xl p-4 justify-start items-center space-x-2 bg-white ${onClick ? "hover:bg-gray-200 cursor-pointer" : ""}`}
            onClick={handleClick}>
            <div className="flex flex-row space-x-2 items-center truncate justify-start">
                <span
                    className="min-w-[48px] min-h-[48px] lg:min-w-[64px] lg:min-h-[64px] rounded-full flex-grow flex justify-center items-center text-md font-bold text-gray-200"
                    style={{backgroundColor: bgColor}}
                >
                    {tm(`${material}.label`).toUpperCase()}
                </span>
                <div className="truncate flex-shrink">
                    <h3 className="text-lg font-bold text-gray-700 mb-0.5 truncate">{tm(`${material}.description`)}</h3>
                    <small className="font-small text-gray-500 text-justify">
                        {id}
                    </small>
                </div>
            </div>
            {showWeight && (
                <div className="flex flex-grow justify-end space-x-2">
                    <div className="border rounded text-gray-700 font-medium text-center text-sm lg:text-xl px-2 py-1 w-[80px] lg:w-[128px]">
                        {weight !== undefined ? `${number(weight)} kg` : tm("no_stock")}
                    </div>
                </div>
            )}
        </div>
    )
}
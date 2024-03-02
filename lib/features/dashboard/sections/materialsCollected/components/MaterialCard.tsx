import {useFormatter, useTranslations} from 'next-intl';

const MaterialIconMap = {
    "1":"🧴",
    "2":"🧻",
    "3":"🍶",
}

interface Props {
    id: string;
    slug: string;
    amount: number;
    unit: 'g' | 'kg' | 't'
}

export const MaterialCard = ({amount, id, unit = 'kg', slug}: Props) => {
    const t = useTranslations("dashboard");
    const {number} = useFormatter()

    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl p-8 md:p-16 justify-center items-center">
            {/*@ts-ignore*/}
            <h3 className="text-4xl font-bold text-gray-800">{MaterialIconMap[id] || "❔"}</h3>
            <span className="flex flex-row items-baseline">
            <h3 className="text-lg font-bold text-gray-800">{number(amount, {maximumFractionDigits: 1})}</h3>
                <small className="font-medium text-gray-500 ml-1">{unit}</small>
            </span>
            <p className="font-medium text-gray-500">{t(slug)}</p>
        </div>
    );
};

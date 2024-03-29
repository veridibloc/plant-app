import {useTranslations} from "next-intl";

interface Props {
    materialSlug: string;
}

export const MaterialTitle = ({materialSlug}: Props) => {
    const tm = useTranslations("materials")
    const material = materialSlug.toLowerCase();

    return <div className="flex flex-row space-x-2 items-center truncate justify-start">
        <div className="truncate flex-shrink">
            <h3 className="text-lg font-bold text-gray-700 mb-0.5 truncate">{tm(`${material}.description`)}</h3>
        </div>
    </div>


}

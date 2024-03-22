import {useTranslations} from "next-intl";
import Link from "next/link";

export const NotFound = () => {
    const t = useTranslations("exceptions");

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] pt-6 px-8  w-full">
            <p className="text-6xl text-center my-4">😭</p>

            <h3 className="text-lg font-bold text-justify my-4">{t("page_not_found")}</h3>
            <p className="text-justify whitespace-pre-line w-full md:w-1/2">
                {t("page_not_found_second_line")}
            </p>
            <Link className="mt-6" href={"/"}>
                <button type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {t("back_to_home")}
                </button>
            </Link>
        </div>
    );
};

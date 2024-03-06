import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/components/QrCodeScanner";

export const Incoming = () => {
    const t = useTranslations("incoming")
    return <div className="flex flex-col items-start justify-start min-h-[85vh] pt-6 w-full gap-4">
        <div className={`mx-auto w-full h-full`}>
            <QrCodeScanner />
        </div>
    </div>

}
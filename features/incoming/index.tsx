"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";


const RegistrationCodeValidator = /^(?<type>va|vb)\.(?<accountId>\d{10,24})(\.(?<lotId>\d{10,24}))?$/;
export const Incoming = () => {
    const t = useTranslations("incoming")
    const {push} = useEnhancedRouter();

    const handleOnResult = (text: string) => {
        const match = RegistrationCodeValidator.exec(text);
        if (match) {
            // @ts-ignore
            const {type, accountId, lotId} = match.groups
            switch (type) {
                case "va":
                    console.info("Valid Collector Code found");
                    return push(`/incoming/${accountId}`)
                case "vb":
                    console.info("Valid Lot Code found");
                    return push(`/incoming/${accountId}/${lotId}`)
                default:
                    // ignore
            }
        }
        console.debug("Invalid Code Format");
    };

    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <div className={`mx-auto w-full h-full`}>
            <QrCodeScanner onResult={handleOnResult}/>
        </div>
    </PageContainer>

}
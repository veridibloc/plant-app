"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {useRouter} from "next/navigation";
import {PageContainer} from "@/ui/components/Layout/PageContainer";


const RegistrationCodeValidator = /^(?<accountId>\d{10,24})(-(?<lotId>\d{10,24}))?$/;
export const Incoming = () => {
    const t = useTranslations("incoming")
    const {push} = useRouter()

    const handleOnResult = (text: string) => {
        const match = RegistrationCodeValidator.exec(text);
        if (match) {
            console.info("Valid Lot Code found");
            // @ts-ignore
            const {accountId, lotId} = match.groups
            if (accountId && lotId) {
                // lot registration - recycler+
                return push(`./incoming/${accountId}/${lotId}`)
            }

            if (accountId && !lotId) {
                // collected waste registration - waste collector
                return push(`./incoming/${accountId}`)
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
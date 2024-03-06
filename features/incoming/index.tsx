"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {useRouter} from "next/navigation";
import {PageContainer} from "@/ui/components/Layout/PageContainer";


const CodeValidator = /^(?<contractId>\d{10,24})-(?<lotId>\d{10,24})$/;
export const Incoming = () => {
    const t = useTranslations("incoming")
    const {push} = useRouter()

    const handleOnResult = (text: string) => {

        const match = CodeValidator.exec(text);
        if (match) {
            console.info("Valid Code found");
            // @ts-ignore
            const {contractId, lotId} = match.groups
            if (contractId && lotId) {
                return push(`./incoming/${contractId}/${lotId}`)
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
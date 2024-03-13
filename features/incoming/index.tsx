"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {AudioPlayer, ImperativeAudioRef} from "@/ui/components/Audio";
import {createRef} from "react";
import {useRouter} from "next/navigation";


const RegistrationCodeValidator = /^(?<type>va|vb)\.(?<accountId>\d{10,24})(\.(?<lotId>\d{10,24}))?$/;
export const Incoming = () => {
    const t = useTranslations("incoming")
    const {push} = useRouter();
    const beepOkRef = createRef<ImperativeAudioRef>();
    const beepErrorRef = createRef<ImperativeAudioRef>();

    const handleOnResult = (text: string) => {
        const match = RegistrationCodeValidator.exec(text);
        if (match) {
            // @ts-ignore
            const {type, accountId, lotId} = match.groups
            switch (type) {
                case "va":
                    console.info("Valid Collector Code found");
                    beepOkRef.current?.play()
                    return push(`/incoming/${accountId}`)
                case "vb":
                    console.info("Valid Lot Code found");
                    beepOkRef.current?.play()
                    return push(`/incoming/${accountId}/${lotId}`)
                default:
                    // ignore
            }
        }
        beepErrorRef.current?.play()
        console.debug("Invalid Code Format");
    };

    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <div className={`mx-auto w-full h-full`}>
            <AudioPlayer ref={beepOkRef} src="/assets/beep_ok.mp3" />
            <AudioPlayer ref={beepErrorRef} src="/assets/beep_error.mp3" />
            <QrCodeScanner onResult={handleOnResult}/>
        </div>
    </PageContainer>

}
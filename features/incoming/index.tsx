"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {AudioPlayer, ImperativeAudioRef} from "@/ui/components/Audio";
import {createRef} from "react";
import {useRouter} from "next/navigation";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";

export const Incoming = () => {
    const t = useTranslations("incoming")
    const {push} = useRouter(); // enhanced router is causing issues... not sure why
    const beepOkRef = createRef<ImperativeAudioRef>();
    const beepErrorRef = createRef<ImperativeAudioRef>();

    const handleOnResult = (text: string) => {
        try {
            const id = ScannableIdentifier.parse(text);
            if (id.isAccountIdentifier()) {
                return push(`/incoming/${id.accountId}`)
            }
            if (id.isLotIdentifier()) {
                return push(`/incoming/${id.stockContractId}/${id.lotId}`)
            }
            beepOkRef.current?.play()
        } catch (_: any) {
            console.debug("Invalid Code Format");
            beepErrorRef.current?.play()
        }
    };

    return <PageContainer hasBackButton={false}>
        <Header title={t("title")} description={t("description")}/>
        <div className={`mx-auto w-full h-full`}>
            <AudioPlayer ref={beepOkRef} src="/assets/beep_ok.mp3"/>
            <AudioPlayer ref={beepErrorRef} src="/assets/beep_error.mp3"/>
            <QrCodeScanner onResult={handleOnResult}/>
        </div>
    </PageContainer>

}
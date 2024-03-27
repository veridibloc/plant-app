"use client"

import {useTranslations} from "next-intl";
import {QrCodeScanner} from "@/ui/components/QrCodeScanner";
import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {AudioPlayer, ImperativeAudioRef} from "@/ui/components/Audio";
import {createRef} from "react";
import {ScannableIdentifier} from "@/common/scannableIdentifiers";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

interface Props {
    onScan: (value: string) => boolean
}
export const IncomingScanner = ({onScan} : Props) => {
    const t = useTranslations("incoming")
    const beepOkRef = createRef<ImperativeAudioRef>();
    const beepErrorRef = createRef<ImperativeAudioRef>();

    const handleOnResult = (text: string) => {
        try {
            (onScan(text) ? beepOkRef : beepErrorRef).current?.play()
        } catch (_: any) {
            console.debug("Invalid Code Format");
            beepErrorRef.current?.play()
        }
    };

    return <>
        <Header title={t("title")} description={t("description")}/>
        <div className={`mx-auto w-full h-full`}>
            <AudioPlayer ref={beepOkRef} src="/assets/beep_ok.mp3"/>
            <AudioPlayer ref={beepErrorRef} src="/assets/beep_error.mp3"/>
            <QrCodeScanner onResult={handleOnResult}/>
        </div>
    </>
}
"use client"

import {AudioPlayer, ImperativeAudioRef} from "@/ui/components/Audio";
import {createRef} from "react";
import {RawQrCodeScanner} from "@/ui/components/QrCodeScanner/RawQrCodeScanner";

interface Props {
    onScan: (value: string) => boolean,
    keepScanning?: boolean
}
export const QrCodeScanner = ({onScan, keepScanning = false} : Props) => {
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
        <div className={`mx-auto w-full h-full`}>
            <AudioPlayer ref={beepOkRef} src="/assets/beep_ok.mp3"/>
            <AudioPlayer ref={beepErrorRef} src="/assets/beep_error.mp3"/>
            <RawQrCodeScanner onResult={handleOnResult} keepScanning={keepScanning}/>
        </div>
    </>
}
"use client";

import {useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";
import {Scanner, useDeviceList} from "@yudiel/react-qr-scanner";
import {DropDown} from "@/ui/components/DropDown";
import {useUserSettings} from "@/ui/hooks/useUserSettings";
import {IconButton} from "@/ui/components/IconButton";
import {RiCameraLine, RiCameraSwitchLine, RiSettings2Line} from "react-icons/ri";
import {useRouter} from "next/navigation";

interface Props {
    onResult: (qrCode: string) => void;
    onError?: (error: Error) => void;
}

export const QrCodeScanner = ({onResult, onError}: Props) => {
    const router = useRouter();
    const t = useTranslations("common.qr-code")
    const [isScanningEnabled, setIsScanningEnabled] = useState(true)
    const [hasError, setHasError] = useState(false)
    const videoDevices = useDeviceList().filter(device => device.kind === "videoinput");
    const {userSettings, updateUserSettings} = useUserSettings();

    useEffect(() => {

        if (userSettings.deviceId) {
            const found = videoDevices.find(device => device.deviceId === userSettings.deviceId);
            if (!found && videoDevices.length) {
                updateUserSettings({deviceId: videoDevices[0].deviceId})
            }
        }

    }, [userSettings.deviceId, videoDevices, updateUserSettings]);

    const handleResult = (payload: string) => {
        setHasError(false);
        onResult(payload);
    }

    const handleError = (e: Error) => {
        console.error("[QRCodeScanner] - Error while scanning", e.message);
        setHasError(true);
        onError && onError(e);
    }

    const handleOpenCameraSettings = () => {
        router.push("/settings/device");
    }

    const openCam = isScanningEnabled;

    return (<div className="p-2 md:p-20 md:max-w-1/2 relative overflow-hidden">
        {videoDevices.length > 1 && (
            <section className="relative w-full text-right">
                <IconButton onClick={handleOpenCameraSettings} Icon={RiCameraSwitchLine} iconSize={24} color="#9CA3AF">
                    <small className="text-gray-400 text-sm">Change Camera</small>
                </IconButton>
            </section>
        )}
        <section className="py-2" onClick={() => setIsScanningEnabled(prevState => !prevState)}>
            {!openCam &&
                <h2 className="w-1/2 left-[25%] text-center top-[40%] text-xl lg:text-2xl font-bold text-gray-400 absolute">
                    {t("touch_to_scan")}
                </h2>
            }
            <Scanner
                styles={{video: {objectFit: "cover"}}}
                onResult={handleResult}
                onError={handleError}
                enabled={Boolean(openCam)}
                options={{
                    deviceId: userSettings.deviceId ?? undefined
                }}
                components={{
                    audio: false,
                    onOff: true,
                    tracker: openCam
                }}
            />
            {hasError && <small className="text-center text-red-500">{t("scanning_error")}</small>}
        </section>
    </div>)
}

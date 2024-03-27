"use client";

import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import {QrScanner} from "@yudiel/react-qr-scanner";
import {useUserSettings} from "@/ui/hooks/useUserSettings";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiCameraSwitchLine} from "react-icons/ri";
import {useRouter} from "next/navigation";
import {useCameraDevices} from "@/ui/hooks/useCameraDevices";

interface Props {
    onResult: (qrCode: string) => void;
    onError?: (error: Error) => void;
}

export const QrCodeScanner = ({onResult, onError}: Props) => {
    const timeout = useRef<NodeJS.Timeout>();
    const router = useRouter();
    const t = useTranslations("common.qr-code")
    const [isScanningEnabled, setIsScanningEnabled] = useState(true)
    const [hasError, setHasError] = useState(false)
    const {devices} = useCameraDevices();
    const {userSettings, updateUserSettings} = useUserSettings();

    useEffect(() => {
        return () => {
            clearTimeout(timeout.current)
        }
    }, []);

    useEffect(() => {
        if (userSettings.deviceId) {
            const found = devices.find(device => device.deviceId === userSettings.deviceId);
            if (!found && devices.length) {
                updateUserSettings({deviceId: devices[0].deviceId})
            }
        }

    }, [userSettings.deviceId, devices, updateUserSettings]);


    const handleResult = (payload: string) => {
        setHasError(false);
        setIsScanningEnabled(false);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            onResult(payload);
        }, 500)
    }

    const handleError = (e: Error) => {
        console.error("[QRCodeScanner] - Error while scanning", e.message);
        setHasError(true);
        setIsScanningEnabled(false);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            onError && onError(e);
        }, 500)
    }

    const handleOpenCameraSettings = () => {
        router.push("/settings/device");
    }

    return (<div className="p-2 md:p-20 md:max-w-1/2 relative overflow-hidden">
        {devices.length > 1 && (
            <section className="relative w-full text-right">
                <IconButton
                    onClick={handleOpenCameraSettings}
                    icon={<RiCameraSwitchLine size={24}/>}
                    label={t("change_camera")}
                />
            </section>
        )}
        <section className="relative py-2" onClick={() => setIsScanningEnabled(prevState => !prevState)}>
            {!isScanningEnabled &&
            <div className="w-full h-[50vh] md:h-[60vh] border-2 rounded border-gray-300">
                <h2 className="w-1/2 left-[25%] text-center top-[40%] text-xl lg:text-2xl font-bold text-gray-400 absolute">
                    {t("touch_to_scan")}
                </h2>
            </div>
            }
            {isScanningEnabled &&
                <QrScanner
                    tracker={false}
                    deviceId={userSettings.deviceId}
                    onError={handleError}
                    onDecode={handleResult}
                    audio={false}
                    stopDecoding={!isScanningEnabled}
                    videoStyle={{
                        objectFit: "cover"
                    }}
                    />
            }
            {hasError && <small className="text-center text-red-500">{t("scanning_error")}</small>}
        </section>
    </div>)
}

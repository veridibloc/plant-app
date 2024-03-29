"use client";

import {useTranslations} from "next-intl";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {QrScanner} from "@yudiel/react-qr-scanner";
import {useUserSettings} from "@/ui/hooks/useUserSettings";
import {IconButton} from "@/ui/components/Buttons/IconButton";
import {RiCameraSwitchLine} from "react-icons/ri";
import {useRouter} from "next/navigation";
import {useCameraDevices} from "@/ui/hooks/useCameraDevices";

interface Props {
    onResult: (qrCode: string) => void;
    onError?: (error: Error) => void;
    keepScanning?: boolean
}

export const RawQrCodeScanner = ({onResult, onError, keepScanning = false}: Props) => {
    const router = useRouter();
    const t = useTranslations("common.qr-code")
    const [isScanningEnabled, setIsScanningEnabled] = useState(true)
    const [hasError, setHasError] = useState(false)
    const {devices} = useCameraDevices();
    const {userSettings, updateUserSettings} = useUserSettings();


    useEffect(() => {
        if (userSettings) {
            const found = devices.find(device => device.deviceId === userSettings.deviceId);
            if (!found && devices.length) {
                updateUserSettings({deviceId: devices[0].deviceId})
            }
        }

    }, [devices, updateUserSettings, userSettings]);


    const handleResult = (payload: string) => {
        setHasError(false);
        if (!keepScanning) {
            setIsScanningEnabled(false);
        }
        onResult(payload);
    }

    const handleError = (e: Error) => {
        console.error("[QRCodeScanner] - Error while scanning", e.message);
        setHasError(true);
        if (!keepScanning) {
            setIsScanningEnabled(false);
        }
    }

    const handleOpenCameraSettings = () => {
        router.push("/settings/device");
    }

    return (<div className="p-2 lg:max-w-1/2 relative overflow-hidden">
        <section className="max-w-xl mx-auto">

            {devices.length > 1 && (
                <div className="relative w-full text-right">
                    <IconButton
                        onClick={handleOpenCameraSettings}
                        icon={<RiCameraSwitchLine size={24}/>}
                        label={t("change_camera")}
                        labelClassName="text-blue-500"
                        className="bg-transparent text-blue-500 text-sm font-semibold rounded-lg border border-transparent hover:!bg-blue-100 hover:text-blue-800 focus:!ring-0 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:!bg-blue-100/30 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:!ring-0"
                    />
                </div>
            )}
            <div className="relative py-2" onClick={() => setIsScanningEnabled(prevState => !prevState)}>
                {!isScanningEnabled &&
                    <div className="w-full h-[42vh] md:h-[60vh] border-2 rounded border-gray-300">
                        <h2 className="w-1/2 left-[25%] text-center top-[40%] text-xl lg:text-2xl font-bold text-gray-400 absolute">
                            {t("touch_to_scan")}
                        </h2>
                    </div>
                }
                {isScanningEnabled &&
                    <>
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
                        <div className="w-full">
                            <small className="block text-gray-400 text-center">{t("touch_to_not_scan")}</small>
                        </div>
                    </>
                }
                {hasError && <small className="text-center text-red-500">{t("scanning_error")}</small>}
            </div>
        </section>
    </div>)
}

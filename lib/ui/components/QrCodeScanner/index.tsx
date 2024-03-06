"use client";

import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import {Scanner, useDeviceList} from "@yudiel/react-qr-scanner";
import {DropDown} from "@/ui/components/DropDown";

interface Props {
    onResult: (qrCode: string) => void;
    onError?: (error: Error) => void;
}
export const QrCodeScanner = ({onResult, onError}: Props) => {
    const t = useTranslations("common.qr-code")
    const [isScanningEnabled, setIsScanningEnabled] = useState(true)
    const [hasError, setHasError] = useState(false)
    const deviceList = useDeviceList();
    const [deviceId, setDeviceId] = useState(deviceList.length ? deviceList[0].deviceId : "");

    const handleResult = (payload: string) => {
        setHasError(false);
        onResult(payload);
    }

    const handleError = (e: Error) => {
        console.error("[QRCodeScanner] - Error while scanning", e.message);
        setHasError(true);
        onError && onError(e);
    }
    const openCam = isScanningEnabled;

    const deviceItems = useMemo(() => {
        return deviceList.reduce((acc, device) => {
            if (device.kind === 'videoinput') {
                acc[device.deviceId] = device.label;
            }
            return acc;
        }, {} as Record<string, any>);
    }, [deviceList]);


    return (<div className="p-2 lg:p-20 relative overflow-hidden">
        <section className="py-2" onClick={() => setIsScanningEnabled(prevState => !prevState)}>
            {!openCam && <h2 className="w-1/2 left-[25%] text-center top-[40%] text-xl lg:text-2xl font-bold text-gray-400 absolute">
                {t("touch_to_scan")}
                </h2>
            }
            <Scanner
                onResult={handleResult}
                onError={handleError}
                enabled={Boolean(openCam)}
                options={{
                    deviceId,
                }}
                components={{
                    audio: false,
                    onOff: true,
                    tracker: openCam
                }}
            />
            {hasError && <small className="text-center text-red-500">{t("scanning_error")}</small>}
        </section>
        {Object.keys(deviceItems).length > 1 && <DropDown label={t("device")}
                                            items={deviceItems}
                                            renderItem={(id, item, index) => (
                                                <div className="block">
                                                    <div className="text-md">Device {index + 1}</div>
                                                    <small className="text-xs text-gray-400">{item}</small>
                                                </div>
                                            )
                                            }
                                            onSelected={setDeviceId}/>
        }
    </div>)
}

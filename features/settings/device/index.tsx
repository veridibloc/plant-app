"use client";

import {useTranslations} from "next-intl";
import {useDeviceList} from "@yudiel/react-qr-scanner";
import {memo} from "react";
import {DeviceCard} from "@/features/settings/device/DeviceCard";
import {useUserSettings} from "@/ui/hooks/useUserSettings";
import {RiCameraOffFill} from "react-icons/ri";

export const DeviceSettings = memo(function DeviceSettings() {
    const t = useTranslations("settings");
    const {updateUserSettings, userSettings} = useUserSettings()
    const videoDevices = useDeviceList().filter(({kind}) => kind === "videoinput");
    const handleDeviceSelected = (deviceId: string) => {
        updateUserSettings({deviceId})
    }

    return (
        <section className="flex flex-col items-start justify-start pt-8 mb-28 w-full gap-8 px-8">
            <p className="font-bold w-full text-center text-lg">
                {t("device_card.label")}
            </p>
            <div className="w-full mx-auto max-w-lg flex flex-col rounded-md gap-6">
                {!videoDevices.length && (
                <div className="flex flex-col justify-center items-center pt-20 gap-y-4">
                    <RiCameraOffFill size={48} color="#ACACAC"/>
                    <h2 className="text-center font-bold text-lg text-gray-600">{t("device_card.no_device_found")}</h2>
                </div>
                )}
                {videoDevices.map(({deviceId, label}) => <DeviceCard
                    key={`dcard-${deviceId}`} label={label} deviceId={deviceId} onClick={handleDeviceSelected}/>)}
            </div>
        </section>
);
})

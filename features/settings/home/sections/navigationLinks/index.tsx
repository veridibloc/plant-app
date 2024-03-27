"use client"

import {useTranslations} from "next-intl";
import {RiAccountPinCircleFill, RiCameraLine, RiTranslate} from "react-icons/ri";
import {LinkCard} from "./components/LinkCard";
import {useMediaDevices} from "@yudiel/react-qr-scanner";

export const NavigationLinks = () => {
    const t = useTranslations("settings");
    const devices = useMediaDevices()

    console.log(devices);

    return (
        <section className="flex flex-col justify-start items-center w-full px-8 gap-4">
            <LinkCard
                href="/settings/account"
                Icon={RiAccountPinCircleFill}
                backgroundIconColor="bg-green-800"
                ctaLabelColor="text-green-800"
                title={t("account_settings_card.title")}
                description={t("account_settings_card.description")}
                ctaLabel={t("account_settings_card.label")}
            />

            <LinkCard
                href="/settings/language"
                Icon={RiTranslate}
                backgroundIconColor="bg-purple-800"
                ctaLabelColor="text-purple-800"
                title={t("language_card.title")}
                description={t("language_card.description")}
                ctaLabel={t("language_card.label")}
            />
            {devices.length >= 1 && (

                <LinkCard
                    href="/settings/device"
                    Icon={RiCameraLine}
                    backgroundIconColor="bg-yellow-800"
                    ctaLabelColor="text-yellow-800"
                    title={t("device_card.title")}
                    description={t("device_card.description")}
                    ctaLabel={t("device_card.label")}
                />
            )}
        </section>
    );
};

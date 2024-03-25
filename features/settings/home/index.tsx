"use client"

import {NavigationLinks} from "./sections/navigationLinks";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";

export const Settings = () => {
    const t = useTranslations("settings")
    return (
        <PageContainer>
            <Header title={t("title")} description={t("description")}/>
            <NavigationLinks/>
        </PageContainer>
    );
};

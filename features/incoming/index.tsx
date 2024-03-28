"use client"

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparatorIncoming} from "@/features/incoming/separator";
import {RecyclerIncoming} from "@/features/incoming/recycler";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";

export function Incoming() {
    const t = useTranslations("incoming")
    const {role} = useUserAccount()
    return <>
        <Header title={t("title")} description={t("description")}/>
        {
            role === "separator"
                ? (<SeparatorIncoming/>)
                : (<RecyclerIncoming/>)
        }
    </>
}

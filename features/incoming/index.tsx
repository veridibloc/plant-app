"use client"

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparatorIncoming} from "@/features/incoming/separator";
import {RecyclerIncoming} from "@/features/incoming/recycler";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {notFound} from "next/navigation";

export function Incoming() {
    const t = useTranslations("incoming")
    const {role, isIntermediate} = useUserAccount()
    if(role === "separator" && isIntermediate) {
        notFound();
    }

    return <>
        <Header title={t("title")} description={t("description")}/>
        {
            role === "separator"
                ? (<SeparatorIncoming/>)
                : (<RecyclerIncoming/>)
        }
    </>
}

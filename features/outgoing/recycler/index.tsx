"use client";

import {Header} from "@/ui/components/Layout/Header";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";

import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {MaterialCard} from "@/ui/components/Materials";

export function RecyclerOutgoing() {
    const t = useTranslations("outgoing.select");
    const {stockContracts} = useUserAccount()
    const router = useEnhancedRouter();

    const handleOnClick =  (materialId: string) => {
        router.push(`/outgoing/r/${materialId}/`);
    }

    return (<>
        <Header title={t("title")} description={t("description")}/>
        {stockContracts.map(({id, label}) =>
            <MaterialCard key={`material-${id}`} materialSlug={label} id={id} onClick={handleOnClick} />
        )}
    </>)
}

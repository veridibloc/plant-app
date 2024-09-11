"use client";

import {useTranslations} from "next-intl";
import {Header} from "@/ui/components/Layout/Header";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {MaterialCard} from "@/ui/components/Materials";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

export function ConverterOutgoing() {
    const t = useTranslations("outgoing")
    const {stockContracts} = useUserAccount();
    const router = useEnhancedRouter();

    const handleOnClick = (materialId: string) => {
        return router.push(`/outgoing/c/${materialId}`);
    }

    return (<>
        <Header title={t("select.title")} description={t("select.description")}/>
        {stockContracts.map(({id, label}) =>
            <MaterialCard key={`material-${id}`} materialSlug={label} id={id} onClick={handleOnClick} />
        )}
    </>)
}

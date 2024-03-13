"use client";

import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {MaterialSelector} from "@/ui/components/Materials";
import {useMemo} from "react";

export function Outgoing() {
    const t = useTranslations("outgoing")
    const tm = useTranslations("materials")
    const {stockContracts, role} = useUserAccount();
    const router = useRouter();

    const materials = useMemo(() => {
        return stockContracts.map(({id, label}) => {
            const llabel = label.toLowerCase();
            return {
                id,
                label: tm(`${llabel}.label`),
                description: tm(`${llabel}.description`)
            }
        })
    }, [stockContracts, tm])
    const handleOnClick = (materialId: string) => {
        console.log("material", materialId)
        // router.push(`/process/${role}/${materialId}`);
    }

    return (<PageContainer>
        <Header title={t("select.title")} description={t("select.description")}/>
        <MaterialSelector materials={materials} onSelected={handleOnClick}/>
    </PageContainer>)
}

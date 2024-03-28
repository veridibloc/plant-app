"use client";

import {Header} from "@/ui/components/Layout/Header";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {MaterialSelector} from "@/ui/components/Materials";
import {useMemo} from "react";
import {useStockContracts} from "@/ui/hooks/useStockContracts";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";

export function SeparatorOutgoing() {
    const ts = useTranslations("separation")
    const t = useTranslations("outgoing")
    const tm = useTranslations("materials")
    const {stockContracts, role} = useUserAccount();
    const {contracts, isLoading} = useStockContracts();
    const router = useEnhancedRouter();

    const materials = useMemo(() => {
        return stockContracts
            .map(({id, label}) => {
                const llabel = label.toLowerCase();

                let weight;
                if (contracts) {
                    weight = contracts.find((c) => c.contractId === id)?.getData()?.stockQuantity;
                }

                return {
                    id,
                    materialSlug: llabel,
                    weight
                }
            }).filter(c => Boolean(c.weight))
    }, [stockContracts, contracts])
    const handleOnClick = (materialId: string) => {
        return router.push(`/outgoing/${materialId}`);
    }

    const href = role === "separator" ? {url: "/separation", label: ts("register.title")} : undefined;

    return (<>
        <Header title={t("select.title")} description={t("select.description")}/>
        <MaterialSelector
            materials={materials}
            onSelected={handleOnClick}
            showWeight={true}
            notFoundComponent={<SimpleCard title={tm("no_material_found.title")} href={href}>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {tm("no_material_found.text")}
                </p>
            </SimpleCard>
            }
        />
    </>)
}

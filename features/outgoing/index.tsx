"use client";

import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {MaterialSelector} from "@/ui/components/Materials";
import {useMemo} from "react";
import useSWR from "swr";
import {useStockContracts} from "@/ui/hooks/useStockContracts";

export function Outgoing() {
    const t = useTranslations("outgoing")
    const tm = useTranslations("materials")
    const {stockContracts, role} = useUserAccount();
    const {contracts, isLoading} = useStockContracts();
    const router = useRouter();



    const materials = useMemo(() => {
        return stockContracts.map(({id, label}) => {
            const llabel = label.toLowerCase();

            let weight;
            // if(contracts){
            //     console.log("contracts", contracts)
            //     // weight = contracts.find((c) => c.contractId === id)?.getData()?.stockQuantity;
            //     const contract = contracts.find((c) => c.contractId === id);
            //     if(contract){
            //         console.log(contract.getData())
            //     }
            // }

            return {
                id,
                label: tm(`${llabel}.label`),
                description: `${tm(`${llabel}.description`)}`,
                weight
            }
        })
    }, [stockContracts, tm, contracts])
    const handleOnClick = (materialId: string) => {
        console.log("material", materialId)
        // router.push(`/process/${role}/${materialId}`);
    }

    console.log("materials", materials)

    return (<PageContainer>
        <Header title={t("select.title")} description={t("select.description")}/>
        <MaterialSelector materials={materials} onSelected={handleOnClick}/>
    </PageContainer>)
}

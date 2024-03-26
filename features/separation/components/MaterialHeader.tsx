"use client"
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {MaterialCard} from "@/ui/components/Materials";
import {useTranslations} from "next-intl";

interface Props {
    materialStockContractId: string;
    className?: string
}

export const MaterialHeader = ({materialStockContractId, className}: Props) => {
    const router = useEnhancedRouter();
    const tm = useTranslations("materials");
    const {stockContracts, email} = useUserAccount();
    const stockContract = stockContracts.find((stockContract) => stockContract.id === materialStockContractId);

    if (!stockContract) {
        console.error(`Stock contract [${materialStockContractId}] for user [${email}] not found. Forgot to configure it?`);
        router.replace("/separation");
        return null;
    }

    return (
        <section className={`w-full ${className}`}>
            <MaterialCard
                id={stockContract.id}
                materialSlug={stockContract.label}
                onClick={() => router.push("/separation")}
            />
        </section>
    )

}
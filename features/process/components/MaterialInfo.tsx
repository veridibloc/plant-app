"use client"
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {MaterialCard} from "./MaterialCard";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

interface Props {
    materialStockContractId: string;
    className?:string
}

export const MaterialInfo = ({materialStockContractId, className}: Props) => {
    const router = useRouter();
    const {stockContracts, email} = useUserAccount();
    const tm = useTranslations("materials");
    const stockContract = stockContracts.find((stockContract) => stockContract.id === materialStockContractId);

    if (!stockContract) {
        console.error(`Stock contract [${materialStockContractId}] for user [${email}] not found. Forgot to configure it?`);
        router.replace("/process");
        return null;
    }

    return (
            <section className={`w-full ${className}`}>
            <MaterialCard
                id={stockContract.id}
                label={tm(`${stockContract.label.toLowerCase()}.label`)}
                description={tm(`${stockContract.label.toLowerCase()}.description`)}
                onClick={() => router.push(`/process`)}
            />
        </section>
    )

}
"use client"
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useRouter} from "next/navigation";
import {MaterialInfo} from "@/ui/components/Materials/MaterialInfo";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

interface Props {
    materialStockContractId: string;
    className?: string
}

export const MaterialHeader = ({materialStockContractId, className}: Props) => {
    const router = useEnhancedRouter();
    const {stockContracts, email} = useUserAccount();
    const stockContract = stockContracts.find((stockContract) => stockContract.id === materialStockContractId);

    if (!stockContract) {
        console.error(`Stock contract [${materialStockContractId}] for user [${email}] not found. Forgot to configure it?`);
        router.replace("/process");
        return null;
    }

    return (<MaterialInfo stockContract={stockContract} onClick={() => router.push("/process")}/>
    )

}
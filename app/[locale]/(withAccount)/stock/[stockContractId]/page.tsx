import {PageProps} from "@/types/pageProps";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Stock} from "@/features/stock";
import {Header} from "@/ui/components/Layout/Header";
import {cache} from "react";
import {useTranslations} from "next-intl";

const fetchStockContract = cache(async (contractId: string) => {
    try {
        return (await contractsProvider.getStockContract(contractId))
    } catch (e: any) {
        console.error(e);
        return null;
    }
});

export default async function Page({params: {stockContractId}}: PageProps<{ stockContractId: string }>) {
    const stockContract = await fetchStockContract(stockContractId);
    if (!stockContract) {
        notFound();
    }

    return <PageContainer>
        <Stock contractId={stockContract.contract.at} contractData={stockContract.getData()}/>
    </PageContainer>
}

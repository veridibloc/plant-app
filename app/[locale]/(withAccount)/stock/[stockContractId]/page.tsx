import {PageProps} from "@/types/pageProps";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {cache} from "react";
import {StockDetails} from "@/features/stock/StockDetails";

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
        <StockDetails contractId={stockContract.contract.at} contractData={stockContract.getData()}/>
    </PageContainer>
}

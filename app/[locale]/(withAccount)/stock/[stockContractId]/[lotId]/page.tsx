import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {PageProps} from "@/types/pageProps";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {LotDetails} from "@/features/stock/LotDetails";

const fetchLotData = cache(async ( lotId: string, contractId: string) => {
    try {

        console.debug("[fetchLotData] Fetching LotData...", lotId, contractId);
        const stock = await contractsProvider.getStockContract(contractId);
        const [lotData, lotReceipt]  = await Promise.all([
            stock.getLotData(lotId),
            stock.getSingleLotReceipt(lotId)
            ])
        return {
            lotData,
            lotReceipt
        }
    } catch (e: any) {
        console.error("[fetchLotData] Error Fetching LotData...", e);
        return null;
    }
});


type Props = PageProps<{
    stockContractId: string,
    lotId: string
}>;
export default async function Page({params: {stockContractId, lotId}}: Props) {
    const lotDetails = await fetchLotData(lotId, stockContractId);
    if (!lotDetails) {
        notFound();
    }
    return <PageContainer>
        <LotDetails
            stockContractId={stockContractId}
            lotData={lotDetails.lotData}
            lotReceiptData={lotDetails.lotReceipt || undefined}
        />
    </PageContainer>
}

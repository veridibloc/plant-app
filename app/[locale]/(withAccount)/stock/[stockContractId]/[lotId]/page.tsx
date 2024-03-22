import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
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
        if(lotReceipt && lotReceipt.value !== '0'){
            const receiptTx = await contractsProvider.ledger.transaction.getTransaction(lotReceipt.value)
        }
        return {
            lotData,
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
        <LotDetails lotData={lotDetails.lotData} stockContractId={stockContractId} />
    </PageContainer>
}

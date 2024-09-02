import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";
import {cache} from "react";
import {LotReceiptsInfo} from "@/types/lotReceiptsInfo";
import {contractsProvider} from "@/common/contractsProvider";
import {getMaterialSlugFromContractDescriptor} from "@/common/getMaterialSlugFromContractDescriptor";
import {StockInfo} from "@/types/stockInfo";
import {notFound} from "next/navigation";


const fetchMaterialLotData = cache(async (materialId: string, lotId: string): Promise<LotReceiptsInfo | null> => {
    try {
        const stockContract = await contractsProvider.getStockContract(materialId);
        const lotReceipt = await stockContract.getSingleLotReceipt(lotId);
        if (!lotReceipt) {
            throw new Error(`lotReceipt for Lot ${lotId} not found`);
        }
        return {
            materialId,
            materialSlug: (getMaterialSlugFromContractDescriptor(stockContract.contract.description) ?? "other").toLowerCase(),
            receipts: [lotReceipt]
        }
    } catch (e: any) {
        console.error(e);
        return null;
    }
});

const fetchStockContractData = cache(async (stockContractId: string): Promise<StockInfo | null> => {
    try {
        const stockContract = await contractsProvider.getStockContract(stockContractId);
        return {
            stockContractId,
            data: stockContract.getData(),
            materialSlug: (getMaterialSlugFromContractDescriptor(stockContract.contract.description) ?? "other").toLowerCase(),
        }
    } catch (e: any) {
        console.error(e);
        return null;
    }
});

interface Props extends PageProps<{ stockContractId: string }, { lotId: string, materialId: string }> {
}

export default async function Page({params: {stockContractId}, searchParams: {lotId, materialId}}: Props) {
    const [lotsInfo, stockInfo] = await Promise.all([
        fetchMaterialLotData(materialId, lotId),
        fetchStockContractData(stockContractId)
    ]);
    if (!lotsInfo || !stockInfo) return notFound();

    return <PageContainer>
        <PageContent lotsInfo={lotsInfo} stockInfo={stockInfo}/>
    </PageContainer>
}


function PageContent({lotsInfo, stockInfo}: { lotsInfo: LotReceiptsInfo, stockInfo: StockInfo }) {
    const t = useTranslations("outgoing.confirm_lot_and_weight")
    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        {JSON.stringify(lotsInfo)}
        <hr/>
        {JSON.stringify(stockInfo)}

        {/*<LotByIdAndWeightForm stockContractId={stockContractId} createLotAction={createLotByLotIdAndWeight} />*/}
    </PageContainer>
}

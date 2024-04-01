import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";
import {LotReceiptData} from "@veridibloc/smart-contracts";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {notFound} from "next/navigation";
import {MultiLotsConfirmationForm} from "@/features/outgoing/components/MultiLotsConfirmationForm";
import {createLotByLotIds} from "./actions";
import {LotReceiptsInfo} from "@/types/lotReceiptsInfo";
import {StockInfo} from "@/types/stockInfo";
import {getMaterialSlugFromContractDescriptor} from "@/common/getMaterialSlugFromContractDescriptor";

// FIXME: we need to consider/distinguish: material contract (PP, PET,PVC) and produced contract (PCR) - the routes `stockContractId` should be the produced contract and not -like now- the material contract.
// TODO: 1. Select the target contract _before_ scanning -> change 'RecyclerOutgoing" component - check
// TODO: 2. From 'RecyclerOutgoing" component redirect to confirmation form /outgoing/{producerContractId}/lots?lotIds=1234,5345345,4654457,56856856856&materialId=35346436
// TODO: 3. In confirmation form call creation, we need to use two contract Ids: PCR and used material (PP, PET, PVC)


const fetchMaterialLotsData = cache(async (materialId: string, lotIds: string): Promise<LotReceiptsInfo | null> => {
    try {
        const stockContract = await contractsProvider.getStockContract(materialId);
        const lotData = await Promise.all(lotIds.split(',').map(stockContract.getSingleLotReceipt.bind(stockContract)));
        const lotReceipts = lotData.filter(l => l !== undefined) as LotReceiptData[];
        return {
            materialId,
            materialSlug: (getMaterialSlugFromContractDescriptor(stockContract.contract.description) ?? "other").toLowerCase(),
            receipts: lotReceipts,
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


interface Props extends PageProps<{ stockContractId: string }, { lotIds: string, materialId: string }> {
}

export default async function Page({params: {stockContractId}, searchParams: {lotIds, materialId}}: Props) {
    const [lotsInfo, stockInfo] = await Promise.all([
        fetchMaterialLotsData(materialId, lotIds),
        fetchStockContractData(stockContractId)
    ]);
    if (!lotsInfo || !stockInfo) return notFound();

    return <PageContainer>
        <PageContent lotsInfo={lotsInfo} stockInfo={stockInfo}/>
    </PageContainer>
}

function PageContent({lotsInfo, stockInfo}: { lotsInfo: LotReceiptsInfo, stockInfo: StockInfo }) {
    const t = useTranslations("outgoing.confirm_multilot")
    return (
        <>
            <Header title={t("title")} description={t("description")}/>
            <MultiLotsConfirmationForm
                lotsInfo={lotsInfo}
                stockInfo={stockInfo}
                createLotAction={createLotByLotIds}/>
        </>
    )
}


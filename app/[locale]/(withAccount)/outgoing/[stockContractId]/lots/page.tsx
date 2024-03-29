import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";
import {LotReceiptData} from "@veridibloc/smart-contracts";
import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {DescriptorData} from "@signumjs/standards";
import {notFound} from "next/navigation";
import {MultiLotsConfirmationForm} from "@/features/outgoing/components/MultiLotsConfirmationForm";

interface StockLotInfo {
    contractId: string;
    materialSlug: string;
    lotReceipts: LotReceiptData[],
}

// FIXME: we need to consider/distinguish: material contract (PP, PET,PVC) and produced contract (PCR) - the routes `stockContractId` should be the produced contract and not -like now- the material contract.
// TODO: 1. Select the target contract _before_ scanning -> change 'RecyclerOutgoing" component
// TODO: 2. From 'RecyclerOutgoing" component redirect to confirmation form /outgoing/{producerContractId}/lots?lotIds=1234,5345345,4654457,56856856856&materialId=35346436
// TODO: 3. In confirmation form call creation, we need to use two contract Ids: PCR and used material (PP, PET, PVC)


const fetchStockContractLotsData = cache(async (contractId: string, lotIds: string): Promise<StockLotInfo | null> => {
    try {
        const contract = await contractsProvider.getStockContract(contractId);
        const lotData = await Promise.all(lotIds.split(',').map(contract.getSingleLotReceipt));
        const lotReceipts = lotData.filter(l => l !== undefined) as LotReceiptData[];
        const contractDescriptor = DescriptorData.parse(contract.contract.description)
        return {
            contractId,
            materialSlug: (contractDescriptor.getCustomField("x-mat") as string ?? "other").toLowerCase(),
            lotReceipts,
        }
    } catch (e: any) {
        console.error(e);
        return null;
    }
});


interface Props extends PageProps<{ stockContractId: string }, {lotIds:string}> {
}

export default async function Page({params: {stockContractId}, searchParams: {lotIds}}: Props) {
    const lotsData = await fetchStockContractLotsData(stockContractId, lotIds)
    if(!lotsData) return notFound();

    return <PageContainer>
        <PageContent lotsInfo={lotsData}/>
    </PageContainer>
}

function PageContent({lotsInfo}: { lotsInfo: StockLotInfo }) {
    const t = useTranslations("outgoing.confirm_multilot")
    const {lotReceipts, materialSlug, contractId} = lotsInfo;
    return (
        <>
            <Header title={t("title")} description={t("description")}/>
            <MultiLotsConfirmationForm stockContractId={contractId} lots={lotReceipts} materialSlug={materialSlug} action={null}/>
        </>
    )
}


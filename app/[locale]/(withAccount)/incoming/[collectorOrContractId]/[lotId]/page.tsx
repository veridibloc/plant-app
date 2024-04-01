import {cache} from "react";
import {contractsProvider} from "@/common/contractsProvider";
import {PageProps} from "@/types/pageProps";
import {LotData} from "@veridibloc/smart-contracts";
import {notFound} from "next/navigation";
import {DescriptorData} from "@signumjs/standards";
import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {LotInfo} from "@/features/incoming/recycler/LotInfo";
import {LotReceiptForm} from "@/features/incoming/recycler/LotReceiptForm";
import {registerLot} from "./actions"
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {RiCheckboxCircleFill} from "react-icons/ri";
import {getMaterialSlugFromContractDescriptor} from "@/common/getMaterialSlugFromContractDescriptor";

interface StockLotInfo {
    materialSlug: string;
    lotData: LotData,
    hasReceiptAlready: boolean
}


const fetchStockContractLotInfo = cache(async (contractId: string, lotId: string): Promise<StockLotInfo | null> => {
    try {
        const contract = await contractsProvider.getStockContract(contractId);
        const [lotData, lotReceipt] = await Promise.all([
            contract.getLotData(lotId),
            contract.getSingleLotReceipt(lotId)
        ])

        return {
            materialSlug: (getMaterialSlugFromContractDescriptor(contract.contract.description) as string ?? "other").toLowerCase(),
            lotData: lotData,
            hasReceiptAlready: Boolean(lotReceipt)
        }
    } catch (e: any) {
        console.error(e);
        return null;
    }
});

interface Props extends PageProps<{ collectorOrContractId: string, lotId: string }> {
}

export default async function Page({params: {lotId, collectorOrContractId}}: Props) {
    const lotInfo = await fetchStockContractLotInfo(collectorOrContractId, lotId);
    if (!lotInfo) {
        notFound();
    }

    return (<PageContainer>
            <PageContent contractId={collectorOrContractId} lotInfo={lotInfo}/>
        </PageContainer>
    )
}


function PageContent({lotInfo, contractId}: { contractId: string, lotInfo: StockLotInfo }) {
    const t = useTranslations("incoming.confirmation.lot")
    const {lotData} = lotInfo;
    return (
        <>
            <Header title={t("title")} description={t("description")}/>
            <LotInfo materialSlug={lotInfo.materialSlug} stockContractId={contractId} lotData={lotData}/>
            {lotInfo.hasReceiptAlready ?
                (<SimpleCard title={t("lot_registered_already.title")}
                             href={{url: "/incoming", label: t("register_more")}}>
                        <div className="flex flex-row gap-x-2 justify-center items-center w-full">
                            <RiCheckboxCircleFill color="green" size={48}/>
                            <p>{t("lot_registered_already.description")}</p>
                        </div>
                    </SimpleCard>
                ) : (
                    <LotReceiptForm
                        contractId={contractId}
                        lotId={lotData.id}
                        registerLotAction={registerLot}
                        quantity={lotData.totalQuantity}
                    />
                )}
        </>
    )
}

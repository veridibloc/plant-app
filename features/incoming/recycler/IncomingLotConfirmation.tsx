import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {LotData} from "@veridibloc/smart-contracts";
import {LotDetails} from "@/features/incoming/recycler/LotDetails";

interface Props {
    contractId: string;
    materialSlug: string;
    lotData: LotData;
    hasReceiptAlready: boolean;
}

export const IncomingLotConfirmation = ({lotData, hasReceiptAlready, contractId, materialSlug}: Props) => {
    const t = useTranslations("incoming.confirmation.lot")

    return <PageContainer>
        <Header title={t("title")} description={t("description")} />
        <LotDetails materialSlug={materialSlug} stockContractId={contractId} lotData={lotData}/>
    </PageContainer>
}
import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {LotByWeightForm} from "@/features/outgoing/components/LotByWeightForm";
import {createLotByWeight} from "./actions"
import {PageProps} from "@/types/pageProps";

interface Props extends PageProps<{ stockContractId: string }> {
}

export default function Page({params: {stockContractId}}: Props) {
    const t = useTranslations("outgoing.confirm")
    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <LotByWeightForm materialId={stockContractId} createLotAction={createLotByWeight}/>
    </PageContainer>
}

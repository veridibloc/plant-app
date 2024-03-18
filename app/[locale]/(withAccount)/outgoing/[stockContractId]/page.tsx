import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {LotByWeightForm} from "@/features/outgoing/LotForms/LotByWeightForm";
import {createLotByWeight} from "./actions"
export default function Page({params : {stockContractId} } : { params: { stockContractId: string } }) {
  const t = useTranslations("outgoing.confirm")
  return <PageContainer>
    <Header title={t("title")} description={t("description")} />
    <LotByWeightForm materialId={stockContractId} createLotAction={createLotByWeight}/>
  </PageContainer>
}

import {Header} from "@/ui/components/Layout/Header";
import {MaterialQuantityForm} from "@/features/process/components/MaterialQuantityForm";
import {registerMaterial} from "./actions";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useTranslations} from "next-intl";
import {MaterialInfo} from "@/features/process/components/MaterialInfo";
export default function Page({params : {stockContractId, role} } : { params: { stockContractId: string, role: string } }) {
  const t = useTranslations(role === "separator" ? "separation.register" : "conversion.register");

  return <PageContainer>
    <Header title={t("title")} description={t("description")}/>
    <MaterialInfo className="mt-4" materialStockContractId={stockContractId} />
    <MaterialQuantityForm materialId={stockContractId} registerAction={registerMaterial}/>
  </PageContainer>
}

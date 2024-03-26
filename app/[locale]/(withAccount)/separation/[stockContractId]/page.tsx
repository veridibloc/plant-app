import {Header} from "@/ui/components/Layout/Header";
import {MaterialQuantityForm} from "@/features/separation/components/MaterialQuantityForm";
import {registerMaterial} from "./actions";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useTranslations} from "next-intl";
import {MaterialHeader} from "@/features/separation/components/MaterialHeader";
export default function Page({params : {stockContractId, role} } : { params: { stockContractId: string, role: string } }) {
  const t = useTranslations(role === "separator" ? "separation.register" : "conversion.register");

  return <PageContainer>
    <Header title={t("title")} description={t("description")}/>
    <MaterialHeader className="mt-4" materialStockContractId={stockContractId} />
    <MaterialQuantityForm materialId={stockContractId} registerAction={registerMaterial}/>
  </PageContainer>
}

import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PrintLot} from "@/features/outgoing/PrintLot";
import {contractsProvider} from "@/common/contractsProvider";
import useSWR from "swr";
export default function Page({params : {stockContractId, lotId} } : { params: { stockContractId: string, lotId: string } }) {
  const t = useTranslations("outgoing.lot")

  return <PageContainer>
    <Header title={t("title")} description={t("description")} />
    <PrintLot lotId={lotId} stockContractId={stockContractId} />
  </PageContainer>
}

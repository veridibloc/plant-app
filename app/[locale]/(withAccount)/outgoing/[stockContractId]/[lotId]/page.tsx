import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PrintLot} from "@/features/outgoing/PrintLot";
import {PageProps} from "@/types/pageProps";

type Props = PageProps<{
    stockContractId: string,
    lotId: string
}, { w: number }>;
export default function Page({params: {stockContractId, lotId}, searchParams}: Props) {
    const t = useTranslations("outgoing.lot")


    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <PrintLot lotId={lotId} stockContractId={stockContractId} weight={searchParams.w}/>
    </PageContainer>
}

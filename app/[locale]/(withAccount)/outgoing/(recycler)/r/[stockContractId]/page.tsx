import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";
import {MultiLotScanner} from "@/features/outgoing/recycler/MultiLotScanner";

interface Props extends PageProps<{ stockContractId: string }> {
}

export default function Page({params: {stockContractId}}: Props) {
    const t = useTranslations("outgoing.scan_multi_lots")
    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <MultiLotScanner stockContractId={stockContractId}/>
    </PageContainer>
}

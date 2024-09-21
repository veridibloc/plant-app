import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";
import {SingleLotScanner} from "@/features/outgoing/converter/SingleLotScanner";

interface Props extends PageProps<{ stockContractId: string }> {
}

export default function Page({params: {stockContractId}, searchParams}: Props) {
    const t = useTranslations("outgoing.confirm_lot_and_weight")
    return <PageContainer>
        <Header title={t("title")} description={t("description_scan")}/>
        <SingleLotScanner stockContractId={stockContractId} />
    </PageContainer>
}

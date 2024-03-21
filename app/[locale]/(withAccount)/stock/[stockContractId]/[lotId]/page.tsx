import {useTranslations} from "next-intl";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {PageProps} from "@/types/pageProps";

type Props = PageProps<{
    stockContractId: string,
    lotId: string
}>;
export default function Page({params: {stockContractId, lotId}}: Props) {
    const t = useTranslations("stock.lot")
    return <PageContainer>
        <Header title={t("title")} description={t("description", {lotId})}/>
        {/*<PrintLot lotId={lotId} stockContractId={stockContractId} weight={searchParams.w}/>*/}
    </PageContainer>
}

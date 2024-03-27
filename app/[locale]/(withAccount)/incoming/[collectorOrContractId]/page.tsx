import {useTranslations} from "next-intl";
import {CollectorForm} from "@/features/incoming/separator/CollectorForm";
import {CollectorInfo} from "@/features/incoming/separator/CollectorInfo";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {Header} from "@/ui/components/Layout/Header";
import {registerCollection} from "./actions";

export default function Page({params: {collectorOrContractId}}: { params: { collectorOrContractId: string } }) {
    const t = useTranslations("incoming.confirmation.collection")
    return <PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <CollectorInfo collectorId={collectorOrContractId}/>
        <CollectorForm collectorId={collectorOrContractId} registerAction={registerCollection}/>
    </PageContainer>

}

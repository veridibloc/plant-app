import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useTranslations} from "next-intl";

export function Conversion() {
    const t= useTranslations("conversion")
    return (<PageContainer>
        <Header title={t("title")} description={t("description")}/>
        <h2>Conversion</h2>
    </PageContainer>)
}

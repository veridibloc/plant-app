import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {MaterialSelector} from "@/ui/components/Materials";
import {useMemo} from "react";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

export function SeparationMaterialSelector() {
    const t = useTranslations("separation")
    const {stockContracts, role} = useUserAccount();
    const router = useEnhancedRouter();

    const materials = useMemo(() => {
        return stockContracts.map(({id, label}) => {
            return {
                id,
                materialSlug: label
            }
        })
    }, [stockContracts])
    const handleOnClick = (materialId: string) => {
        router.push(`/process/${role}/${materialId}`);
    }

    return (<PageContainer>
        <Header title={t("select.title")} description={t("select.description")}/>
        <MaterialSelector materials={materials} onSelected={handleOnClick}/>
    </PageContainer>)
}

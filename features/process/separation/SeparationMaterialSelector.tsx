import {Header} from "@/ui/components/Layout/Header";
import {PageContainer} from "@/ui/components/Layout/PageContainer";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useTranslations} from "next-intl";
import {MaterialCard} from "../components/MaterialCard";
import {useRouter} from "next/navigation";

export function SeparationMaterialSelector() {
    const t = useTranslations("separation")
    const tm = useTranslations("materials")
    const {stockContracts, role} = useUserAccount();
    const router = useRouter();

    const handleOnClick = (materialId: string) => {
        router.push(`/process/${role}/${materialId}`);
    }

    return (<PageContainer>
        <Header title={t("select.title")} description={t("select.description")}/>
        <section className="w-full space-y-4">
            {stockContracts.map(c =>
                <MaterialCard
                    key={`material-card-${c.id}`}
                    id={c.id}
                    label={tm(`${c.label.toLowerCase()}.label`)}
                    description={tm(`${c.label.toLowerCase()}.description`)}
                    onClick={handleOnClick}
                />
            )}
        </section>
    </PageContainer>)
}

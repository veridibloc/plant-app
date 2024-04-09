import {MaterialCard} from "./MaterialCard";
import {SimpleCard} from "@/ui/components/Cards/SimpleCard";
import {useTranslations} from "next-intl";
interface Props {
    materials: {id: string, materialSlug: string, weight?: number}[];
    showWeight?: boolean;
    onSelected: (materialId: string) => void
    notFoundComponent?: React.ReactNode
}
export function MaterialSelector({materials, onSelected, showWeight = false, notFoundComponent = null} : Props) {
    const t = useTranslations("materials");

    return (
        <section className="w-full space-y-4">
            {materials.map(m =>
                <MaterialCard
                    key={`material-card-${m.id}`}
                    id={m.id}
                    materialSlug={m.materialSlug}
                    weight={m.weight}
                    showWeight={showWeight}
                    onClick={onSelected}
                />
            )}
            {materials.length === 0 && !notFoundComponent && (
                <SimpleCard title={t("no_material_found.title")}>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {t("no_material_found.text")}
                    </p>
                </SimpleCard>
            )}
            {materials.length === 0 && notFoundComponent}
        </section>
    )
}

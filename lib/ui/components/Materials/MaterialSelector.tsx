import {MaterialCard} from "./MaterialCard";
interface Props {
    materials: {id: string, label: string, description: string, weight?: number}[];
    onSelected: (materialId: string) => void
}
export function MaterialSelector({materials, onSelected} : Props) {
    return (
        <section className="w-full space-y-4">
            {materials.map(m =>
                <MaterialCard
                    key={`material-card-${m.id}`}
                    id={m.id}
                    label={m.label}
                    description={m.description}
                    weight={m.weight}
                    onClick={onSelected}
                />
            )}
        </section>
    )
}

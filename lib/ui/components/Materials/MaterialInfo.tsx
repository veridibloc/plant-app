"use client"
import {MaterialCard} from "./MaterialCard";
import {useTranslations} from "next-intl";

interface Props {
    stockContract: { id: string; label: string };
    className?: string
    onClick?: (id: string) => void
}

export const MaterialInfo = ({stockContract, className, onClick}: Props) => {
    const tm = useTranslations("materials");
    return (
        <section className={`w-full ${className}`}>
            <MaterialCard
                id={stockContract.id}
                label={tm(`${stockContract.label.toLowerCase()}.label`)}
                description={tm(`${stockContract.label.toLowerCase()}.description`)}
                onClick={onClick}
            />
        </section>
    )

}
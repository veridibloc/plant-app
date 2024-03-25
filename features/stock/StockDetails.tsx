"use client";
import {StockContractData} from "@veridibloc/smart-contracts";
import {MaterialCard} from "@/ui/components/Materials";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {LotList} from "@/features/stock/components/LotList";

interface Props {
    contractId: string
    contractData: StockContractData;
}

export function StockDetails({contractId, contractData}: Props) {
    const t = useTranslations("stock");
    const {stockContracts} = useUserAccount();
    const materialLabel = (stockContracts.find(lstc => lstc.id === contractId)?.label ?? "").toLowerCase();

    return <>
        <Header title={t("title")} description={t("description")}/>
        <section className="px-2 w-full">
            <MaterialCard
                id={contractId}
                materialSlug={materialLabel}
                weight={contractData.stockQuantity}
                showWeight={true}
            />
        </section>
        <section className="px-2 w-full">
        <LotList contractId={contractId}/>
        </section>
    </>
}
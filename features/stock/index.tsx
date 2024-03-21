"use client";
import {StockContractData} from "@veridibloc/smart-contracts";
import {MaterialCard} from "@/ui/components/Materials";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {Header} from "@/ui/components/Layout/Header";
import {useTranslations} from "next-intl";
import {contractsProvider} from "@/common/contractsProvider";
import useSWR from "swr";
import {useSingleStockContract} from "@/ui/hooks/useSingleStockContract";
import {LotList} from "@/features/stock/components/LotList";
import {LotSearchField} from "@/features/stock/components/LotSearchField";

interface Props {
    contractId: string
    contractData: StockContractData;
}


export function Stock({contractId, contractData}: Props) {
    const t = useTranslations("stock");
    const {stockContracts} = useUserAccount();
    const materialLabel = (stockContracts.find(lstc => lstc.id === contractId)?.label ?? "").toLowerCase();

    return <>
        <Header title={t("title")} description={t("description")} />
        <MaterialCard
            id={contractId}
            materialSlug={materialLabel}
            weight={contractData.stockQuantity}
            showWeight={true}
        />
        <LotList contractId={contractId}/>
    </>
}
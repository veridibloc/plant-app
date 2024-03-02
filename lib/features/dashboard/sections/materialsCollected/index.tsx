"use client";

import { useTranslations } from "next-intl";
import { MaterialCard } from "./components/MaterialCard";
import { useContext, useMemo } from "react";
import { MaterialContext } from "@/context/MaterialContext";
import { useLedgerService } from "@/hooks/useLedgerService";
import { useAccount } from "@/hooks/useAccount";

import useSWR from "swr";

type MaterialCardData = {
  id: string;
  slug: string;
  unit: "g" | "kg" | "t";
  amount: number;
};

export const MaterialsCollected = () => {
  const t = useTranslations("dashboard");
  const { accountInfo } = useAccount();
  const ledgerService = useLedgerService();
  const { materials } = useContext(MaterialContext);

  const { isLoading, data: materialMap } = useSWR(
    accountInfo ? `/materials/${accountInfo.accountId}` : null,
    async () => {
      if (!accountInfo) return null;
      return ledgerService.fetchCollectedMaterialPerAccount(
        accountInfo.accountId
      );
    },
    {
      refreshInterval: 120_000,
    }
  );

  const materialCardData = useMemo(() => {
    if (!materialMap) {
      return [];
    }

    const data: Record<string, MaterialCardData> = {};
    for (const tx of materialMap.values()) {
      const materialId = tx.material.id;
      if (!materials[materialId]) {
        continue;
      }
      const material = materials[materialId];
      if (!data[materialId]) {
        data[materialId] = {
          id: materialId,
          slug: material.slug,
          unit: material.unit,
          amount: Number(tx.material.amount),
        };
      } else {
        data[materialId].amount += Number(tx.material.amount);
      }
    }
    return Object.values(data);
  }, [materialMap, materials]);

  const hasNothingCollectedYet = !isLoading && materialCardData.length === 0;

  return (
    <section className="flex justify-start items-start w-full px-4 flex-wrap">
      <p className="font-bold w-full text-start text-lg ml-4">
        {t("material_collected_other")}
      </p>
      <div className="flex flex-row mx-auto overflow-x-auto space-x-4 p-4 h-36 md:h-48">
        {isLoading && (
          <>
            <div className="bg-gray-200 rounded-xl animate-pulse w-[180px]" />
            <div className="bg-gray-200 rounded-xl animate-pulse w-[180px]" />
          </>
        )}
        {!hasNothingCollectedYet &&
          !isLoading &&
          materialCardData.map((card) => (
            <MaterialCard key={card.id} {...card} />
          ))}
        {hasNothingCollectedYet && (
          <div className="flex flex-col justify-center items-center">
            <div className="text-6xl">🗑️</div>
            <div className="text-lg font-medium text-gray-400 mt-1">
              {t("nothing_collected_yet")}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

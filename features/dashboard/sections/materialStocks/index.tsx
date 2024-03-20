"use client";

import { useTranslations } from "next-intl";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {useStockContracts} from "@/ui/hooks/useStockContracts";
import {MaterialCard, MaterialCardProps, MaterialCardSkeleton} from "@/ui/components/Materials";
import {useMemo} from "react";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";


export const MaterialStocks = () => {
  const t = useTranslations("dashboard");
  const tm = useTranslations("materials");
  const {publicKey, stockContracts} = useUserAccount();
  const {isLoading, contracts = []} = useStockContracts();
  const router = useEnhancedRouter()

  const materialCardData = useMemo(() => {

    // map for random O(1) access
    const materialLabelMap = stockContracts.reduce( (acc, stlc) => {
      acc[stlc.id] = stlc.label;
      return acc;
    }, {} as Record<string, string> )

    const materialCardData : MaterialCardProps[] = [];
    for(let contract of contracts) {
      const label = materialLabelMap[contract.contractId];
      if(label){
        const {stockQuantity} = contract.getData()
        materialCardData.push({
          description: tm(`${label.toLowerCase()}.description`),
          id: contract.contractId,
          weight: stockQuantity,
          showWeight: true,
          label,
        })
      }
    }
    return materialCardData
  }, [stockContracts, contracts, tm]);


  const hasNothingRegisteredYet = !isLoading && contracts.length === 0;

  const gotoMaterialStock = (id: string) => {
    router.push(`/stock/${id}`);
  }

  return (
      <section className="flex justify-start items-start w-full px-4 flex-wrap">
        <p className="font-bold w-full text-start text-lg">{t("material_other")}</p>
        <div className="flex flex-col mx-auto space-y-2 my-4 w-full">
          {isLoading && (
              <>
                <MaterialCardSkeleton/>
                <MaterialCardSkeleton/>
                <MaterialCardSkeleton/>
              </>
          )}
          {hasNothingRegisteredYet &&
              !isLoading && (
                  <>
                    <small className="text-xs text-gray-400">{t("click_for_details")}</small>
                    {
                      materialCardData.map((props) => (
                          <MaterialCard key={props.id} onClick={gotoMaterialStock} {...props} />))
                    }
                  </>
              )
          }
          {!hasNothingRegisteredYet && (
              <div className="flex flex-col justify-center items-center">
                <div className="text-6xl">❕</div>
                <div className="text-md font-medium text-gray-400 mt-2">
                  {t("nothing_registered_yet")}
                </div>
              </div>
          )}
        </div>
      </section>
  );
};

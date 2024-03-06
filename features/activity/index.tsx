"use client";

import { useTranslations } from "next-intl";
import { useAccount } from "@/ui/hooks/useAccount";
import { useLedgerService } from "@/ui/hooks/useLedgerService";
import { ActivityCard } from "./components/ActivityCard";
import { LoadingIndicator } from "./components/LoadingIndicator";

import Image from "next/image";
import useSWR from "swr";

export const Activity = () => {
  const t = useTranslations("activity");
  const { accountInfo } = useAccount();
  const ledgerService = useLedgerService();

  const { data, isLoading } = useSWR(
    accountInfo ? `/activity/${accountInfo.accountId}` : null,
    async () => {
      if (!accountInfo) return null;
      return ledgerService.fetchRelevantAccountTransactions(
        accountInfo.accountId
      );
    },
    { refreshInterval: 120_000 }
  );

  const dataArray = data
    ? Array.from(data, (entry) => ({ id: entry[0], ...entry[1] }))
    : [];

  return (
    <div className="flex flex-col items-start justify-start min-h-[85vh] pt-6 mb-28 w-full gap-4 px-8">
      <p className="font-bold w-full text-center text-lg">{t("title")}</p>

      {isLoading && <LoadingIndicator />}

      {!!(!isLoading && dataArray.length) ? (
        <div className="w-full gap-4 flex flex-col">
          {dataArray.map((data) => (
            <ActivityCard key={data.id} {...data} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] pt-6 px-8  w-full">
          <Image
            src="/assets/trash_icon.webp"
            width={156}
            height={156}
            alt="Picture of a trash bin"
            unoptimized
          />

          <h3 className="text-lg font-bold text-center text-gray-500">
            {t("no_activity.title")}
          </h3>
          <p className="text-center">{t("no_activity.description")}</p>
        </div>
      )}
    </div>
  );
};

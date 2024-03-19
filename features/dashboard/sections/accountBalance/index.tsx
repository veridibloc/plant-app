"use client";

import { useTranslations } from "next-intl";
import {useAccountBalances} from "@/ui/hooks/useAccountBalances";
import {BalanceCard} from "@/features/dashboard/sections/accountBalance/components/BalanceCard";

export const AccountBalances = () => {
  const t = useTranslations("dashboard");
  // const { accountInfo } = useAccount();
    const {accountBalances} = useAccountBalances();
  // TODO: fetch balances...and persist in atoms...

    console.log("accountBalances", accountBalances);

  return (
    <section className="flex justify-start items-start w-full flex-wrap px-4 gap-4">
      <p className="font-bold w-full text-start text-lg">{t("balance")}</p>
      {accountBalances.map( (ab) => (
        <BalanceCard key={ab.tokenId} balance={ab}/>
      ))}
    </section>
  );
};

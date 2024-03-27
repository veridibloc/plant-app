"use client";

import {useTranslations} from "next-intl";
import {useAccountBalances} from "@/ui/hooks/useAccountBalances";
import {BalanceCard} from "./components/BalanceCard";

export const AccountBalances = () => {
    const t = useTranslations("dashboard");
    const {accountBalances} = useAccountBalances();
    return (
        <section className="flex justify-start items-start w-full flex-wrap px-2 gap-2">
            <p className="font-bold w-full text-start text-lg">{t("balance_other")}</p>
            <small className="text-xs text-gray-400">{t("click_for_transfer")}</small>
            {accountBalances.map((ab) => (
                <BalanceCard key={ab.tokenId} balance={ab}/>
            ))}
        </section>
    );
};

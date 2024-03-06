import { useTranslations } from "next-intl";
import { useAccount } from "@/ui/hooks/useAccount";
import { BalanceCard } from "./components/BalanceCard";
import { BalanceInfo } from "@/types/balanceInfo";

const DefaultVericleanInfo: BalanceInfo = {
  amount: "0",
  symbol: "VERICLEAN",
  decimals: 2,
};

const DefaultSignaInfo: BalanceInfo = {
  amount: "0",
  symbol: "SIGNA",
  decimals: 2, // defaults to two decimals, for simplicity
};

export const AccountBalances = () => {
  const t = useTranslations("dashboard");
  const { accountInfo } = useAccount();

  return (
    <section className="flex justify-start items-start w-full px-8 flex-wrap gap-4">
      <p className="font-bold w-full text-start text-lg">{t("balance")}</p>
      <BalanceCard
        balanceInfo={accountInfo?.balances.vericlean || DefaultVericleanInfo}
      />
      <BalanceCard
        balanceInfo={accountInfo?.balances.signa || DefaultSignaInfo}
      />
    </section>
  );
};

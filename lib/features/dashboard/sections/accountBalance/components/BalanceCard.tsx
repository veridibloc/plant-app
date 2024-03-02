import { useFormatter } from "next-intl";
import { BalanceInfo } from "@/types/balanceInfo";

import Image from "next/image";

interface Props {
  balanceInfo: BalanceInfo;
}

export const BalanceCard = ({ balanceInfo }: Props) => {
  const { number } = useFormatter();
  const { decimals, symbol, amount } = balanceInfo;

  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-4 w-full">
      <div className="flex items-center">
        {symbol === "VERICLEAN" && (
          <Image
            src="/assets/vericlean_logo_main.svg"
            width={40}
            height={40}
            alt="Vericlean Logo"
            className="ml-1 mr-1.5"
            unoptimized
          />
        )}

        {symbol === "SIGNA" && (
          <Image
            src="/assets/signum_logo_blue.svg"
            width={36}
            height={36}
            alt="Signum Logo"
            className="mx-2"
            unoptimized
          />
        )}
        <h3 className="text-4xl font-bold text-gray-800"></h3>
        <h3 className="text-lg font-bold text-gray-800">
          {number(Number(amount), { maximumFractionDigits: decimals })}
        </h3>
      </div>
      <p className="font-medium text-gray-500">{symbol.toUpperCase()}</p>
    </div>
  );
};

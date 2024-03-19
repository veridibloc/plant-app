import { useFormatter } from "next-intl";
import { BalanceInfo } from "@/types/balanceInfo";

// @ts-ignore
import ColorHash from "color-hash"
import Image from "next/image";
import {TokenBalance} from "@/types/tokenBalance";
import {Amount, ChainValue} from "@signumjs/util";

const colorHash = new ColorHash();
interface Props {
  balance: TokenBalance;
}

export const BalanceCard = (props : Props) => {
  const { number } = useFormatter();
  const { decimals, balance, tokenId, ticker } = props.balance;

  const amount = Number(ChainValue.create(decimals).setAtomic(balance).getCompound());
  const color = colorHash.hex(tokenId);

  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-4 w-full">
      <div className="flex items-center">
        {(ticker === "SIGNA" || ticker === "TSIGNA") && (
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
          {number(amount, { maximumFractionDigits: decimals })}
        </h3>
      </div>
      <p className="font-medium text-gray-500">{ticker.toUpperCase()}</p>
    </div>
  );
};

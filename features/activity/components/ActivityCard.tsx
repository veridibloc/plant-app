import { useFormatter, useTranslations } from "next-intl";
import { RiDoubleQuotesL, RiSwapBoxFill } from "react-icons/ri";
import { useAccount } from "@/ui/hooks/useAccount";
import { RelevantAccountTransaction } from "@/common/ledgerService";
import Image from "next/image";

export const ActivityCard = ({
  signa,
  vericlean,
  date,
  message,
  sender,
}: RelevantAccountTransaction) => {
  const t = useTranslations("activity");
  const { accountInfo } = useAccount();
  const { number, relativeTime } = useFormatter();

  const accountSentFunds = sender.id === accountInfo?.accountId;

  const signaDecimals = accountInfo?.balances.signa.decimals || 0;
  const vericleanDecimals = accountInfo?.balances.vericlean.decimals || 0;

  const canShowSignaChip = signa && signa !== "0";
  const canShowVericleanChip = vericlean && vericlean !== "0";

  const currentDate = new Date();

  let actionSymbol = "+";
  let assetChipClass = "text-green-500 bg-green-100";
  if (accountSentFunds) {
    assetChipClass = "text-red-500 bg-red-100";
    actionSymbol = "-";
  }

  return (
    <div className="flex flex-col bg-white border-b py-4 px-2 w-full max-w-lg mx-auto gap-4">
      <div className="w-full flex items-center justify-between">
        <p className="font-bold text-sm flex items-center gap-1">
          {accountSentFunds ? (
            <span className="text-2xl text-gray-600">
              <RiSwapBoxFill />
            </span>
          ) : (
            <Image
              src="/assets/coin.png"
              width={22}
              height={22}
              alt="Icon Transaction"
              unoptimized
            />
          )}

          {t(accountSentFunds ? "card.transfer_title" : "card.receive_title")}
        </p>
        <small className="font-medium text-gray-500">
          {relativeTime(date, currentDate)}
        </small>
      </div>

      <div className="w-full flex items-center justify-start gap-4">
        {canShowSignaChip && (
          <span
            className={`${assetChipClass} font-bold px-2 rounded-md text-sm`}
          >
            {actionSymbol}{" "}
            {number(Number(signa), { maximumFractionDigits: signaDecimals })}
            <span className="font-bold text-gray-500"> SIGNA</span>
          </span>
        )}

        {canShowVericleanChip && (
          <span
            className={`${assetChipClass} font-bold px-2 rounded-md text-sm`}
          >
            {actionSymbol}{" "}
            {number(Number(vericlean), {
              maximumFractionDigits: vericleanDecimals,
            })}
            <span className="font-bold text-gray-500"> VERICLEAN</span>
          </span>
        )}
      </div>

      {message && (
        <blockquote className="relative">
          <span className="absolute top-0 left-0 transform -translate-x-6 -translate-y-4 text-6xl text-gray-100">
            <RiDoubleQuotesL />
          </span>

          <div className="relative">
            <p className="text-gray-800 text-justify text-sm">{message}</p>
          </div>
        </blockquote>
      )}
    </div>
  );
};

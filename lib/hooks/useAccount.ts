"use client";

import { useUser } from "@clerk/nextjs";
import { useLedgerService } from "@/hooks/useLedgerService";
import { useAppContext } from "@/hooks/useAppContext";
import { useContext } from "react";
import { PublicKeyContext } from "@/context/PublicKeyContext";
import { Address } from "@signumjs/core";
import { Amount, ChainValue } from "@signumjs/util";
import { LedgerService } from "@/services/ledgerService";
import { AccountInfo } from "@/types/accountInfo";

import useSWR from "swr";

interface FetchAccountInfoArgs {
  publicKey: string;
  ledgerService: LedgerService;
  vericleanTokenId: string;
}

async function fetchAccountInfo({
  vericleanTokenId,
  publicKey,
  ledgerService,
}: FetchAccountInfoArgs) {
  if (!ledgerService || !publicKey) {
    return null;
  }

  const accountId = Address.fromPublicKey(publicKey).getNumericId();

  const [accountResponse, vericleanTokenResponse] = await Promise.allSettled([
    ledgerService.fetchAccount(accountId),
    ledgerService.fetchVericleanTokenInfo(),
  ]);

  let response: AccountInfo = {
    accountId,
    balances: {
      signa: {
        amount: "0",
        decimals: 8,
        symbol: "SIGNA",
      },
      vericlean: {
        amount: "0",
        decimals: 2,
        symbol: "VERICLEAN",
      },
    },
  };

  let vericleanQuantity = "0";
  if (accountResponse.status === "fulfilled") {
    response.balances.signa.amount = Amount.fromPlanck(
      accountResponse.value.guaranteedBalanceNQT
    ).getSigna();

    if (accountResponse.value.assetBalances) {
      vericleanQuantity =
        accountResponse.value.assetBalances.find(
          ({ asset }) => asset === vericleanTokenId
        )?.balanceQNT || "0";
    }
  }

  if (vericleanTokenResponse.status === "fulfilled") {
    response.balances.vericlean = {
      amount: ChainValue.create(vericleanTokenResponse.value.decimals)
        .setAtomic(vericleanQuantity)
        .getCompound(),
      symbol: vericleanTokenResponse.value.name,
      decimals: vericleanTokenResponse.value.decimals,
    };
  }

  return response;
}

export const useAccount = () => {
  const { user, isSignedIn } = useUser();
  const ledgerService = useLedgerService();
  const {
    Tokens: { Vericlean },
  } = useAppContext();
  const { publicKey } = useContext(PublicKeyContext);
  const isAuthenticated = isSignedIn || false;
  const firstName = isSignedIn && user ? String(user.firstName) : "";
  const lastName = isSignedIn && user ? String(user.lastName) : "";
  const fullName = isSignedIn && user ? String(user.fullName) : "";

  const { data } = useSWR(
    ledgerService && publicKey ? `fetch/account/${publicKey}` : null,
    async () =>
      fetchAccountInfo({
        vericleanTokenId: Vericlean,
        publicKey,
        ledgerService,
      }),
    {
      refreshInterval: 120_000,
    }
  );

  return { firstName, lastName, fullName, accountInfo: data, isAuthenticated };
};

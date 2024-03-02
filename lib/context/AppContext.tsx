"use client";

import { FC, createContext } from "react";
import type { ChildrenProps } from "@/types/childrenProps";
import { LedgerService } from "@/services/ledgerService";
import { Config } from "../config";

type AddressPrefixType = "TS" | "S";
type SignaPrefixType = "TSIGNA" | "SIGNA";

export interface AppContextType {
  Ledger: {
    IsTestNet: boolean;
    AddressPrefix: AddressPrefixType;
    SignaPrefix: SignaPrefixType;
    Hosts: string[];
    PollingInterval: number;
    Service: LedgerService;
  };
  Tokens: {
    Vericlean: string;
  };
}

const config: AppContextType = {
  Ledger: {
    ...Config.Ledger,
    AddressPrefix: Config.Ledger.IsTestNet ? "TS" : "S",
    SignaPrefix: Config.Ledger.IsTestNet ? "TSIGNA" : "SIGNA",
    Service: new LedgerService({
      nodeHost: Config.Ledger.Hosts[0],
      vericleanTokenId: Config.Tokens.Vericlean,
      vericleanContractId: Config.Contracts.VericleanContract,
    }),
  },
  Tokens: { ...Config.Tokens },
};

export const AppContext = createContext<AppContextType>(config);

export const AppContextProvider: FC<ChildrenProps> = ({ children }) => {
  return <AppContext.Provider value={config}>{children}</AppContext.Provider>;
};

import * as process from 'process';

const toNumber = (v: any): number => {
  const n = parseFloat(v);
  return Number.isNaN(n) ? -1 : n;
};

const fromArray = (csv: string): string[] => csv.split(",");

const toBoolean = (v: string): boolean => v.toLowerCase() === "true";

const isTestNet = toBoolean(
  process.env.NEXT_PUBLIC_LEDGER_IS_TESTNET || "true"
);

export const Config = {
  Ledger: {
    IsTestNet: isTestNet,
    ExplorerUrl: process.env.NEXT_PUBLIC_LEDGER_EXPLORER_URL || "https://t-chain.signum.network",
    PollingInterval:
      toNumber(process.env.NEXT_PUBLIC_LEDGER_POLLING_INTERVAL_SECS || "30") *
      1000,
    Hosts: fromArray(
      process.env.NEXT_PUBLIC_LEDGER_HOST_URLS || "http://localhost:6876"
    ),
  },
  Contracts: {
    VericleanContract: process.env.NEXT_PUBLIC_VERICLEAN_TOKEN_CONTRACT || "",
  },
  Tokens: {
    Vericlean: process.env.NEXT_PUBLIC_VERICLEAN_TOKEN_ID || "",
  },
};

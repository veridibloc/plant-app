import { BalanceInfo } from "./balanceInfo";

export interface AccountInfo {
  accountId: string;
  balances: {
    signa: BalanceInfo;
    vericlean: BalanceInfo;
  };
}

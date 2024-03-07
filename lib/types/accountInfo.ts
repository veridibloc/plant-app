import { BalanceInfo } from "./balanceInfo";

/**
 * @deprecated This is for collector only
 */
export interface AccountInfo {
  accountId: string;
  balances: {
    signa: BalanceInfo;
    vericlean: BalanceInfo;
  };
}

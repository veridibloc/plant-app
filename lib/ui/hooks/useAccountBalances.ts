import useSWR from "swr";
import {useAtom, useSetAtom} from "jotai";
import {accountBalancesAtom, singleAccountBalancesAtomWriter} from "@/ui/states/accountBalancesAtom";
import * as process from "process";
import {useLedgerService} from "@/ui/hooks/useLedgerService";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {Address} from "@signumjs/core";
import {TokenBalance} from "@/types/tokenBalance";

const SignaTokenId = "0";
function createSignaBalance(planck: string): TokenBalance {
    return {
        balance: planck,
        tokenId: SignaTokenId,
        ticker: process.env.NEXT_PUBLIC_LEDGER_IS_TESTNET ? "TSIGNA" : "SIGNA",
        decimals: 8,
    }
}

export function useAccountBalances() {
    const {publicKey} = useUserAccount();
    const [accountBalances] = useAtom(accountBalancesAtom);
    const setAccountBalance = useSetAtom(singleAccountBalancesAtomWriter);
    const ledgerService = useLedgerService()


    useSWR(`accountBalances/${publicKey}`, async () => {
        const {unconfirmedAssetBalances, unconfirmedBalanceNQT} = await ledgerService.fetchAccount(Address.fromPublicKey(publicKey).getNumericId());
        setAccountBalance(createSignaBalance(unconfirmedBalanceNQT));
        for (const assetBalance of unconfirmedAssetBalances) {
            const knownAlready = accountBalances.find( (tb) => tb.tokenId === assetBalance.asset );
            if(knownAlready) {
                setAccountBalance({
                    ...knownAlready,
                    balance: assetBalance.unconfirmedBalanceQNT
                })
            }
            else {
                ledgerService.fetchTokenInfo(assetBalance.asset).then( (tokenInfo) => {
                    setAccountBalance({
                        balance: assetBalance.unconfirmedBalanceQNT,
                        tokenId: tokenInfo.asset,
                        ticker: tokenInfo.name,
                        decimals: tokenInfo.decimals
                    })
                }).catch(console.error);
            }
        }

    }, {
        refreshInterval: 120_000
    })

    return {accountBalances};
}
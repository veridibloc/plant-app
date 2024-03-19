import {atomWithStorage} from "jotai/utils"
import {atom} from "jotai";
import {withImmer} from "jotai-immer"
import {TokenBalance} from "@/types/tokenBalance";

export const accountBalancesAtom = withImmer(atomWithStorage<TokenBalance[]>('accountBalances', [] ));

export const singleAccountBalancesAtomWriter = atom(null, (_get, set, balance: TokenBalance) => {
    set(accountBalancesAtom, (tokenBalances) => {
        const found  = tokenBalances.find(token => token.tokenId === balance.tokenId);
        if(found){
            found.balance = balance.balance;
        }
        else{
            tokenBalances.push(balance);
        }
        return tokenBalances;
    });
} );


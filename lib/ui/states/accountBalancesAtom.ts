import {atomWithStorage} from "jotai/utils"
import {atom} from "jotai";
import {withImmer} from "jotai-immer"
import {TokenBalance} from "@/types/tokenBalance";

const InitialState: TokenBalance[] = [];
export const accountBalancesAtom = withImmer(atomWithStorage<TokenBalance[]>('accountBalances', InitialState, undefined, {getOnInit: true}));

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

export const accountBalancesAtomResetter = atom(null, (_get, set) => {
    set(accountBalancesAtom, (userSettings) => {
        return InitialState;
    });
});


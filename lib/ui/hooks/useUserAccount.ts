import {useContext} from 'react';
import {AccountContext} from "@/ui/context/AccountContext";

export function useUserAccount() {
    return useContext(AccountContext);
}

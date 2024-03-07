"use client";
import {UserAccount} from '@/types/userAccount';
import {createContext} from 'react';
import {ChildrenProps} from "@/types/childrenProps";

export const AccountContext = createContext<UserAccount>({
    publicKey: '',
    role: "separator",
    collectible: [],
    stockContracts: [],
    isCorporative: false,
    email: '',
    firstName: '',
    isActive: false
});

export const AccountProvider = ({account, children}: { account: UserAccount } & ChildrenProps) => (
    <AccountContext.Provider value={account}>
        {children}
    </AccountContext.Provider>
)
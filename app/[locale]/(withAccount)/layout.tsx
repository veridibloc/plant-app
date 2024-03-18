import {ClientRootLayout} from "@/ui/components/Layout/ClientRootLayout";
import type {ChildrenProps} from "@/types/childrenProps";
import {currentUser} from "@clerk/nextjs";
import {notFound} from "next/navigation";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {AccountProvider} from "@/ui/context/AccountContext";
import {Address} from "@signumjs/core";

export default async function RootLayout({children}: ChildrenProps) {
    const user = await currentUser();

    if (!user) {
        console.debug("No user found");
        return null;
    }

    const account = await fetchUserAccount(user)
    if (!account) {
        console.error("Account not found for userId: ", user.id)
        return notFound();
    }

    console.debug("Account loaded", Address.fromPublicKey(account.publicKey).getReedSolomonAddress(), account.role);

    return (
        <AccountProvider account={account}>
            <ClientRootLayout>
                {children}
            </ClientRootLayout>;
        </AccountProvider>
    )
}

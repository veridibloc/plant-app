import {Layout} from "@/ui/components/Layout";
import type {ChildrenProps} from "@/types/childrenProps";
import {auth, currentUser, useUser} from "@clerk/nextjs";
import {notFound, redirect} from "next/navigation";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {AccountProvider} from "@/ui/context/AccountContext";

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

    return (
        <AccountProvider account={account}>
            <Layout>
                {children}
            </Layout>;
        </AccountProvider>
    )
}

import {type ReactNode} from "react";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {ClerkProvider, currentUser} from "@clerk/nextjs";
import {getClerkLocalization} from "@/common/getClerkLocalization";
import {Locales} from "@/lib/translations/locales";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {PrelineScript} from "@/ui/components/PrelineScript";
import {Inter} from "next/font/google";
import "../globals.css";
import {UserAccount} from "@/types/userAccount";
import {AccountContext, AccountProvider} from "@/ui/context/AccountContext";

export const metadata: Metadata = {
    title: "VeridiBloc Plant App",
};

const inter = Inter({subsets: ["latin"]});

function RootLayout({
                        children,
                        locale,
                        userAccount,
                    }: {
    userAccount: UserAccount;
    locale: string;
    children: ReactNode;
}) {
    const messages = useMessages();

    const isValidLocale = Locales.some((cur) => cur === locale);

    if (!isValidLocale) {
        return notFound();
    }

    return (
        <html lang={locale} className={inter.className}>
        <meta name="theme-color" content="#ffffff"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="msapplication-TileColor" content="#ffffff"/>
        <meta name="msapplication-tap-highlight" content="no"/>
        <meta name="theme-color" content="#ffffff"/>

        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"/>
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicon.ico"/>

        <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
            <AccountProvider account={userAccount}>
                {children}
            </AccountProvider>
        </NextIntlClientProvider>
        </body>

        <PrelineScript/>
        </html>
    );
}

async function AccountWrapper({
                                  children,
                                  locale,
                              }: {
    locale: string;
    children: ReactNode;
}) {
    const user = await currentUser();
    if (!user) {
        return null;
    }
    const account = await fetchUserAccount(user)
    if (!account) {
        console.error("Account not found for userId: ", user.id)
        return notFound();
    }
    return (
        <RootLayout userAccount={account} locale={locale}>
            {children}
        </RootLayout>
    );
}

export default async function LayoutWrapper({
                                                children,
                                                params: {locale},
                                            }: {
    children: ReactNode;
    params: { locale: string };
}) {
    return (
        <ClerkProvider
            localization={getClerkLocalization(locale)}
            afterSignInUrl={`/${locale}/dashboard`}
        >
            <AccountWrapper locale={locale}>{children}</AccountWrapper>
        </ClerkProvider>
    );
}

import {type ReactNode} from "react";
import type {Metadata} from "next";
import {notFound, redirect} from "next/navigation";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {ClerkProvider, currentUser, SignIn} from "@clerk/nextjs";
import {getClerkLocalization} from "@/common/getClerkLocalization";
import {Locales} from "@/lib/translations/locales";
import {fetchUserAccount} from "@/server/fetchUserAccount";
import {PrelineScript} from "@/ui/components/PrelineScript";
import {Inter} from "next/font/google";
import "../globals.css";
import {AccountProvider} from "@/ui/context/AccountContext";
import {ChildrenProps} from "@/types/childrenProps";

export const metadata: Metadata = {
    title: "VeridiBloc Plant App",
};

const inter = Inter({subsets: ["latin"]});

function WithTranslations({children, locale}: { locale: string } & ChildrenProps) {
    const messages = useMessages();
    return <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
    </NextIntlClientProvider>
}

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: ReactNode;
    params: { locale: string };
}) {

    const locale = params.locale
    console.debug("RootLayout", params);
    return (
        <html lang={locale} className={inter.className}>
        <WithTranslations locale={locale}>
            <ClerkProvider
                localization={getClerkLocalization(locale)}
                afterSignInUrl={`/${locale}/dashboard`}
            >
                <body>
                {children}
                </body>
            </ClerkProvider>
        </WithTranslations>
        <PrelineScript/>
        </html>
    );
}

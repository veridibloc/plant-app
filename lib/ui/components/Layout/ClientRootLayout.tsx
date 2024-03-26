"use client";

import {ReactNode} from "react";
import {useUser} from "@clerk/nextjs";
import {AppContextProvider} from "@/ui/context/AppContext";
import {BottomNavigation} from "lib/ui/components/Layout/BottomNavigation";
import {Notification} from "@/ui/components/Notification";
import {Provider as JotaiProvider} from "jotai";
import {RoutingIndicator} from "@/ui/components/Layout/RoutingIndicator";
import {Menu} from "@/ui/components/Layout/Menu";
import {Watermark} from "@/ui/components/Watermark";

interface Props {
    children: ReactNode;
}

export const ClientRootLayout = ({children}: Props) => {
    const {isLoaded, isSignedIn, user} = useUser();
    const canShowBottomNavigation = Boolean(isLoaded && isSignedIn && user);
    return (
        <AppContextProvider>
            <JotaiProvider>
                <main className="container mx-auto relative overflow-y-auto max-w-3xl flex flex-col">
                    <Watermark />
                    <Notification/>
                    <RoutingIndicator/>
                    <Menu/>
                    {children}
                    {canShowBottomNavigation ? <BottomNavigation/> : <div/>}
                </main>
            </JotaiProvider>
        </AppContextProvider>
    );
};

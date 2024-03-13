"use client";

import {ReactNode, useEffect} from "react";
import {useUser} from "@clerk/nextjs";
import {AppContextProvider} from "@/ui/context/AppContext";
import {BottomNavigation} from "lib/ui/components/Layout/BottomNavigation";
import {MaterialProvider} from "@/ui/context/MaterialContext";
import {Notification} from "@/ui/components/Notification";
import {Provider as JotaiProvider} from "jotai";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";


interface Props {
    children: ReactNode;
}

export const ClientRootLayout = ({children}: Props) => {
    const {isLoaded, isSignedIn, user} = useUser();
    const canShowBottomNavigation = Boolean(isLoaded && isSignedIn && user);

    useEffect(() => {

        const handleRouteStarted = () => {
            console.log("Route started");
        }

        const handleRouteFinished = () => {
            console.log("Route finished");
        }

        window.addEventListener("routeStarted", handleRouteStarted)
        window.addEventListener("routeFinished", handleRouteFinished)
        return () => {
            window.removeEventListener("routeStarted", handleRouteStarted);
            window.removeEventListener("routeFinished", handleRouteFinished);
        }
    }, []);

    return (
        <AppContextProvider>
            <MaterialProvider>
                <JotaiProvider>
                    <main
                        className="container mx-auto relative overflow-y-auto max-w-3xl flex flex-col justify-between items-center">
                        <Notification/>
                        {children}
                        {canShowBottomNavigation ? <BottomNavigation/> : <div/>}
                    </main>
                </JotaiProvider>
            </MaterialProvider>
        </AppContextProvider>
    );
};

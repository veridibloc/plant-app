"use client";

import {ReactNode} from "react";
import {useUser} from "@clerk/nextjs";
import {AppContextProvider} from "@/ui/context/AppContext";
import {BottomNavigation} from "lib/ui/components/Layout/BottomNavigation";
import {MaterialProvider} from "@/ui/context/MaterialContext";

interface Props {
    children: ReactNode;
}

export const Layout = ({children}: Props) => {
    const {isLoaded, isSignedIn, user} = useUser();

    const canShowBottomNavigation = Boolean(isLoaded && isSignedIn && user);

    return (
        <AppContextProvider>
            <MaterialProvider>
                <main
                    className="container mx-auto relative overflow-y-auto max-w-3xl flex flex-col justify-between items-center">
                    {children}
                    {canShowBottomNavigation ? <BottomNavigation/> : <div/>}
                </main>
            </MaterialProvider>
        </AppContextProvider>
    );
};

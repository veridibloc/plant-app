"use client";

import {ReactNode} from "react";
import {useUser} from "@clerk/nextjs";
import {AppContextProvider} from "@/context/AppContext";
import {BottomNavigation} from "@/components/Layout/components/BottomNavigation";
import {MaterialProvider} from "@/context/MaterialContext";

interface Props {
    children: ReactNode;
}

export const Layout = ({children}: Props) => {
    const {isLoaded, isSignedIn, user} = useUser();

    const canShowBottomNavigation = !!(isLoaded && isSignedIn && user);

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

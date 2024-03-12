"use client";

import {ReactNode, useEffect} from "react";
import {useUser} from "@clerk/nextjs";
import {AppContextProvider} from "@/ui/context/AppContext";
import {BottomNavigation} from "lib/ui/components/Layout/BottomNavigation";
import {MaterialProvider} from "@/ui/context/MaterialContext";
import {notificationAtom} from "@/ui/states/notificationAtom";
import {useAtom} from "jotai";
import {Notification} from "@/ui/components/Notification";

interface Props {
    children: ReactNode;
}

export const Layout = ({children}: Props) => {
    const {isLoaded, isSignedIn, user} = useUser();
    const [notification, setNotification] = useAtom(notificationAtom)

    const canShowBottomNavigation = Boolean(isLoaded && isSignedIn && user);

    useEffect(() => {

    })

    return (
        <AppContextProvider>
            <MaterialProvider>
                <main
                    className="container mx-auto relative overflow-y-auto max-w-3xl flex flex-col justify-between items-center">
                    <Notification/>
                    {children}
                    {canShowBottomNavigation ? <BottomNavigation/> : <div/>}
                </main>
            </MaterialProvider>
        </AppContextProvider>
    );
};

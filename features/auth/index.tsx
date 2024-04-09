"use client";

import {useTranslations} from "next-intl";
import {useAuth, SignIn as ClerkSignIn} from "@clerk/nextjs";
import {Spinner} from "@/ui/components/Spinner";
import {useEffect, useRef} from "react";
import {Logo} from "@/ui/components/Logo";
import Link from "next/link";
import Image from "next/image";

// dirty hack to remove signup links
function disableSignUp() {
    if (!document) return;
    setTimeout(() => {
            const footer = document.getElementsByClassName("cl-footer");
            for (let e of footer) {
                e.remove();
            }
        }, 1_000
    )
}

export const SignIn = () => {
    const {isLoaded} = useAuth();
    const ref = useRef<any>();
    const t = useTranslations("index");

    useEffect(() => {
        if (ref.current) {
            disableSignUp();
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center h-[75vh] mt-4 pt-4 overflow-x-hidden">
            <div className="flex flex-row justify-center items-center w-full mb-4">
                    <Image src="/assets/veridibloc_logo.svg" alt="Veridibloc logo" width={48}/>
                    <div className="relative">
                        <h1 className="text-center text-4xl font-bold ml-2">VeridiBloc</h1>
                        <small className="absolute top-10 text-xs text-veridibloc right-0">Recycling 4.0</small>
                    </div>
            </div>
            <p className="text-center text-neutral-500 max-w-xs font-medium mb-4">
                {t("welcome_title")}
            </p>
            {isLoaded ? <div ref={ref}><ClerkSignIn/></div> : <Spinner/>}
        </section>
    );
};

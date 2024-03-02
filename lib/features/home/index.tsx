"use client";

import {useTranslations} from "next-intl";
import {useUser, SignIn} from "@clerk/nextjs";
import {Spinner} from "@/components/Spinner";
import {useEffect, useRef} from "react";

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

export const Home = () => {
    const {isLoaded} = useUser();
    const ref = useRef<any>();
    const t = useTranslations("index");

    useEffect(() => {
        if (ref.current) {
            disableSignUp();
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center h-[75vh] mt-4 pt-4 overflow-x-hidden">
            <h1 className="text-center text-4xl font-bold mb-4">♻️ Veridibloc</h1>

            <p className="text-center text-neutral-500 max-w-xs font-medium mb-4">
                {t("welcome_title")}
            </p>

            {isLoaded ? <div ref={ref}><SignIn/></div> : <Spinner/>}
        </section>
    );
};

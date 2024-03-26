"use client"

import {useEffect, useLayoutEffect, useState} from "react";
import {Spinner} from "@/ui/components/Spinner";
import {AnimatePresence, motion} from "framer-motion";

export function RoutingIndicator() {
    const [isRouting, setIsRouting] = useState(-1)

    useLayoutEffect(() => {

        const handleRouteStarted = () => {
            setIsRouting(1);
            // setTimeout(() => {
            //     setIsRouting((prevState) => {
            //         if(prevState === -1){
            //             return 1;
            //         }
            //         return 0
            //     });
            // }, 100)
        }

        const handleRouteFinished = () => {
            setIsRouting(0);
        }

        window.addEventListener("routeStarted", handleRouteStarted)
        window.addEventListener("routeFinished", handleRouteFinished)
        return () => {
            window.removeEventListener("routeStarted", handleRouteStarted);
            window.removeEventListener("routeFinished", handleRouteFinished);
        }

    }, []);

    return (
        <AnimatePresence>
            {
                isRouting === 1 && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <section className="absolute top-8 left-7 w-4 h-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-veridibloc opacity-75"/>
                        </section>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

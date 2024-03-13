"use client"

import {useEffect, useState} from "react";
import {Spinner} from "@/ui/components/Spinner";
import {AnimatePresence, motion} from "framer-motion";

export function RoutingIndicator() {
    const [isRouting, setIsRouting] = useState(false)

    useEffect(() => {

        const handleRouteStarted = () => {
            setTimeout(() => {
                setIsRouting(true);
            }, 250)
        }

        const handleRouteFinished = () => {
            setIsRouting(false);
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
                isRouting && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>

                        <section className="absolute top-2 right-2">
                            <Spinner className="text-gray-400"/>
                        </section>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

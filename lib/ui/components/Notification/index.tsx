import {useAtom} from "jotai";
import {notificationAtom} from "@/ui/states/notificationAtom";
import {useEffect, useRef} from "react";
import {AnimatePresence, motion} from "framer-motion"

const ColorMap = {
    error: "red",
    success: "green",
    info: "blue",
    warning: "yellow"
}

export function Notification() {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [notification, setNotification] = useAtom(notificationAtom);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])

    useEffect(() => {
        timerRef.current && clearTimeout(timerRef.current)
        if (notification) {
            timerRef.current = setTimeout(() => {
                setNotification(null);
            }, 5_000)
        }
    }, [notification, setNotification])


    const color = notification ? ColorMap[notification.type] ?? "gray" : "gray";
    return (
        <AnimatePresence>
            {notification && (
                <section className="absolute top-0">
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1, y: 32}} exit={{opacity: 0, y: -32}}>
                        <div
                            className={`max-w-sm bg-${color}-100 border border-${color}-200 text-sm text-${color}-800 rounded-lg dark:bg-${color}-800/10 dark:border-${color}-900 dark:text-${color}-500 shadow-xl`}
                            role="alert">
                            <div className="flex p-4">
                                {notification.message}
                                <div className="ms-auto">
                                    <button type="button"
                                            className={`inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-${color}-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-${color}-200`}
                                            onClick={() => setNotification(null)}>
                                        <span className="sr-only">Close</span>
                                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 6 6 18"/>
                                            <path d="m6 6 12 12"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            )}
        </AnimatePresence>
    )

}

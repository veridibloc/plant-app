import {useAtom} from "jotai";
import {notificationAtom} from "@/ui/states/notificationAtom";
import {useEffect, useRef} from "react";
import {AnimatePresence, motion} from "framer-motion"

const BgColorMap = {
    error: "bg-red-100 border-red-200 text-red-800 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500",
    success: "bg-green-100 border-green-200 text-green-800 dark:bg-green-800/10 dark:border-green-900 dark:text-green-500",
    info: "bg-blue-100 border-blue-200 text-blue-800 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500",
    warning: "bg-yellow-100 border-yellow-200 text-yellow-800 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500",
    neutral: "bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-800/10 dark:border-gray-900 dark:text-gray-500"
}

const TextColorMap = {
    error: "text-red-800 dark:text-red-200",
    success: "text-green-800 dark:text-green-200",
    info: "text-blue-800 dark:text-blue-200",
    warning: "text-yellow-800 dark:text-yellow-200",
    neutral: "text-gray-800 dark:text-gray-200"
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


    const bgColor = notification ? BgColorMap[notification.type] ?? BgColorMap.neutral : BgColorMap.neutral;
    const textColor = notification ? TextColorMap[notification.type] ?? TextColorMap.neutral : TextColorMap.neutral;
    return (
        <AnimatePresence>
            {notification && (
                <section className="absolute left-2 top-0 z-20 h-0 w-full w-max-[768px] px-2">
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1, y: 16}} exit={{opacity: 0, y: 0}}>
                        <div
                            className={`max-w-sm border text-sm rounded-lg shadow-xl ${bgColor}`}
                            role="alert">
                            <div className="flex p-4">
                                {notification.message}
                                <div className="ms-auto">
                                    <button type="button"
                                            className={`inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 ${textColor}`}
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

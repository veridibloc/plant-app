"use client"

import {useTranslations} from "next-intl";
import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {
    RiLogoutBoxLine,
    RiMenuFoldLine,
    RiMenuLine,
    RiSettings2Line
} from "react-icons/ri";
import React, {useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {useClerk} from "@clerk/nextjs";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";
import {Avatar} from "@/ui/components/Avatar";
import {AvatarImage} from "@/ui/components/Avatar/AvatarImage";

export const Menu = () => {
    const t = useTranslations("navigation");
    const {signOut, user} = useClerk();
    const router = useEnhancedRouter();
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen( prevState => !prevState)
    }
    const logOut = () => signOut(() => router.push("/"));

    return (
        <section className="fixed w-full max-w-[768px] text-right p-4 pr-6 z-10">

            <div className="hs-dropdown relative inline-flex">
                <motion.button id="hs-dropdown-default" type="button"
                               onClick={toggleMenu}
                               animate={isOpen ? "open" : "close"}
                               initial={false}
                               className="hs-dropdown-toggle highlight-off relative h-[48px] w-[48px] inline-flex items-center gap-x-2 text-sm rounded-full font-medium bg-transparent text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    <motion.div
                        className="absolute left-[12px]"
                        variants={{
                            open: {
                                opacity: 0,
                                rotate: '-90deg'
                            },
                            close: {
                                opacity: 1,
                                rotate: '0deg'
                            }
                        }}>
                        <RiMenuLine size={20}/>
                    </motion.div>

                    <motion.div
                        className="absolute left-[12px]"
                        variants={{
                            open: {
                                opacity: 1,
                                rotate: '-90deg'
                            },
                            close: {
                                opacity: 0,
                                rotate: '0deg'
                            }
                        }}>
                        <RiMenuFoldLine size={20}/>
                    </motion.div>
                </motion.button>

                <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 my-2 space-y-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                    aria-labelledby="hs-dropdown-default">
                    <Link
                        className="flex text-center items-center justify-center gap-x-3.5 py-4 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                        href="/settings/account"
                        onClick={toggleMenu}
                    >
                        <div className="flex flex-col items-center gap-x-2 text-center">
                            <div className="w-[32px] h-[32px]">
                                <Avatar>
                                    <AvatarImage src={user?.imageUrl || ""} alt={user?.firstName || ""}/>
                                </Avatar>
                            </div>
                            <small className="text-sm text-gray-800">{user?.firstName}</small>
                        </div>
                    </Link>
                    <hr />
                    <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                        href="/settings"
                        onClick={toggleMenu}
                    >
                        <div className="flex flex-row items-center gap-x-2">
                            <RiSettings2Line/>
                            {t("settings")}
                        </div>
                    </Link>
                    <hr/>
                    <button
                        onClick={() => {
                            toggleMenu();
                            return logOut()
                        }}
                        className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-lg text-red-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                    >
                        <div className="flex flex-row items-center gap-x-2 w-full">
                            <RiLogoutBoxLine/>
                            {t("signout")}
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
};

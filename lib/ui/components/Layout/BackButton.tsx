"use client";

import {RiArrowGoBackLine} from "react-icons/ri";
import {useEnhancedRouter} from "@/ui/hooks/useEnhancedRouter";

export function BackButton() {

    const router  = useEnhancedRouter()
    const handleClick = (e: any) => {
        e.preventDefault();
        return router.back()
    }

    return (
    <div className="fixed ml-4 text-gray-300 z-10 select-none hover:text-gray-400 transition-colors ease-in-out duration-150 cursor-pointer p-2 h-[48px] w-[48px]" onClick={handleClick}>
        <RiArrowGoBackLine size={24} />
    </div>

    )
}

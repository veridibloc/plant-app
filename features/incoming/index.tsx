"use client"

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparatorIncoming} from "@/features/incoming/separator";
import {RecyclerIncoming} from "@/features/incoming/recycler";

export function Incoming() {
    const {role} = useUserAccount()
    return role === "separator"
        ? (<SeparatorIncoming/>)
        : (<RecyclerIncoming/>)
}

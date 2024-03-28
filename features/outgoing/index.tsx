"use client";

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparatorOutgoing} from "@/features/outgoing/separator";
import {RecyclerOutgoing} from "@/features/outgoing/recycler";

export function Outgoing() {
    const { role} = useUserAccount();
    return ( role === "separator" ? <SeparatorOutgoing /> : <RecyclerOutgoing />)
}

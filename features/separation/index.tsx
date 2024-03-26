"use client";

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparationMaterialSelector} from "./SeparationMaterialSelector";
import {notFound} from "next/navigation";

export function Separation() {
    const {role} = useUserAccount();

    // atm, no further conversion process
    if(role !== "separator"){
        notFound();
    }

    return <SeparationMaterialSelector />;
}

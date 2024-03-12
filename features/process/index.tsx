"use client";

import {useUserAccount} from "@/ui/hooks/useUserAccount";
import {SeparationMaterialSelector} from "./separation/SeparationMaterialSelector";
import {Conversion} from "./conversion";

export function Process() {
    const {role} = useUserAccount();
    return role === "separator" ? <SeparationMaterialSelector /> : <Conversion/>;
}

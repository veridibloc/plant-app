import {ChildrenProps} from "@/types/childrenProps";
import {useEffect, useState} from "react";

export function PureClientOnly({children} : ChildrenProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
        return () => {
            setIsMounted(false);
        }
    }, [])

    return isMounted ? <>{children}</> : null;
}
import {usePathname, useRouter} from "next/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useCallback, useEffect} from "react";

let routingSituation = "finished"
export function useEnhancedRouter() {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(pathName && routingSituation !== "finished") {
            routingSituation = "finished"
            window.dispatchEvent(new CustomEvent("routeFinished"));
        }
    }, [pathName]);

    function startRouting(){
        routingSituation = "started"
        window.dispatchEvent(new CustomEvent("routeStarted"));
    }

    const replace = useCallback((href: string, options?: NavigateOptions) => {
        startRouting();
        router.replace(href, options);
    }, [router]);

    const push = useCallback((href: string, options?: NavigateOptions) => {
        startRouting()
        router.push(href, options);
    }, [router]);

    const back = useCallback(() => {
        startRouting()
        router.back();
    }, [router]);

    const forward = useCallback(() => {
        startRouting()
        router.forward();
    }, [router]);

    return {
        replace,
        push,
        back,
        forward
    }
}
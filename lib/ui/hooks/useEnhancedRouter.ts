import {usePathname, useRouter} from "next/navigation";
import {NavigateOptions} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useCallback, useEffect} from "react";

export function useEnhancedRouter() {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(pathName){
            window.dispatchEvent(new CustomEvent("routeFinished"));
        }
    }, [pathName]);

    const replace = useCallback((href: string, options?: NavigateOptions) => {
        window.dispatchEvent(new CustomEvent("routeStarted"));
        router.replace(href, options);
    }, [router]);

    const push = useCallback((href: string, options?: NavigateOptions) => {
        window.dispatchEvent(new CustomEvent("routeStarted"));
        router.push(href, options);
    }, [router]);

    return {
        replace,
        push
    }
}
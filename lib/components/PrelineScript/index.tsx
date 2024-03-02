"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export function PrelineScript() {
  const path = usePathname();
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    if (isBrowser) {
      setTimeout(() => {
        window.HSStaticMethods.autoInit();
      }, 5_000);
    }
  }, [path, isBrowser]);

  return null;
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { IStaticMethods,HSDropdown } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    HSDropdown: HSDropdown
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
      }, 100);
    }
  }, [path, isBrowser]);

  return null;
}

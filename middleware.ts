import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { DefaultLocale, Locales } from "@/types/locales";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: Locales,
  defaultLocale: DefaultLocale,
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
  publicRoutes: ["/", "/:locale"],
  ignoredRoutes:["/api/clerk/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};

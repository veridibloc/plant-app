import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import { DefaultLocale, Locales } from "@/types/locales";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: Locales,
  defaultLocale: DefaultLocale,
});

const IgnoreIntlRoute = /\/api\/.*/;

export default authMiddleware({
  beforeAuth: (req) => {
    if (IgnoreIntlRoute.test(req.url)) {
      return NextResponse.next();
    }

    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
  publicRoutes: ["/", "/:locale"],
  ignoredRoutes:["/api/clerk/webhook"],
});


const localesMatcher = `/(${Locales.join("|")})(.*)`

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)",  "/(api|trpc)(.*)"],
};

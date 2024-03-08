import { authMiddleware } from "@clerk/nextjs";
import { DefaultLocale, Locales } from "@/lib/translations/locales";
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
  publicRoutes: ["/", "/:locale", "/:locale/signin"],
  ignoredRoutes:["/api/clerk/webhook"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", '/(pt|en)/:path*', "/(api|trpc)(.*)"],
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};

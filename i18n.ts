import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  return {
    messages: (await import(`./lib/translations/${locale}.json`)).default,
  };
});

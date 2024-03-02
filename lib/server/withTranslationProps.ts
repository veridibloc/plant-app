import { GetServerSidePropsContext } from "next";
import { DefaultLocale } from "@/types/locales";

export async function withTranslationProps(ctx: GetServerSidePropsContext) {
  const { locale = DefaultLocale } = ctx;
  const messages = (await import(`../messages/${locale}.json`)).default;
  return {
    messages,
  };
}

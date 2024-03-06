"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export const LanguageSettings = () => {
  const t = useTranslations("settings");

  return (
    <section className="flex flex-col items-start justify-start pt-8 mb-28 w-full gap-8 px-8">
      <p className="font-bold w-full text-center text-lg">
        {t("language_card.label")}
      </p>

      <div className="w-full mx-auto max-w-lg flex flex-col rounded-md gap-6">
        <Link href="/en/settings/language" locale="en">
          <button
            type="button"
            className="p-4 w-full inline-flex justify-start items-center gap-2 rounded-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
          >
            <span className="inline-flex items-center justify-center  h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
              <span className="font-medium text-white leading-none">EN</span>
            </span>

            <span className="ml-1 text-center text-lg font-medium">
              English
            </span>
          </button>
        </Link>

        <Link href="/pt/settings/language" locale="pt">
          <button
            type="button"
            className="p-4 w-full inline-flex justify-start items-center gap-2 rounded-md border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm"
          >
            <span className="inline-flex items-center justify-center  h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
              <span className="font-medium text-white leading-none">PT</span>
            </span>

            <span className="ml-1 text-center text-lg font-medium">
              Português
            </span>
          </button>
        </Link>
      </div>
    </section>
  );
};

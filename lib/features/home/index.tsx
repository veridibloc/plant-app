"use client";

import { useTranslations } from "next-intl";
import { useUser, SignIn } from "@clerk/nextjs";
import { Spinner } from "@/components/Spinner";

export const Home = () => {
  const { isLoaded } = useUser();
  const t = useTranslations("index");

  return (
    <section className="flex flex-col items-center justify-center h-[75vh] mt-4 pt-4 overflow-x-hidden">
      <h1 className="text-center text-4xl font-bold mb-4">♻️ Veridibloc</h1>

      <p className="text-center text-neutral-500 max-w-xs font-medium mb-4">
        {t("welcome_title")}
      </p>

      {isLoaded ? <SignIn /> : <Spinner />}
    </section>
  );
};

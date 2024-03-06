import { useTranslations } from "next-intl";
import { RiAccountPinCircleFill, RiTranslate } from "react-icons/ri";
import { LinkCard } from "./components/LinkCard";

export const NavigationLinks = () => {
  const t = useTranslations("settings");

  return (
    <section className="flex flex-col justify-start items-center w-full px-8 gap-4">
      <LinkCard
        href="/settings/account"
        Icon={RiAccountPinCircleFill}
        backgroundIconColor="bg-green-800"
        ctaLabelColor="text-green-800"
        title={t("account_settings_card.title")}
        description={t("account_settings_card.description")}
        ctaLabel={t("account_settings_card.label")}
      />

      <LinkCard
        href="/settings/language"
        Icon={RiTranslate}
        backgroundIconColor="bg-purple-800"
        ctaLabelColor="text-purple-800"
        title={t("language_card.title")}
        description={t("language_card.description")}
        ctaLabel={t("language_card.label")}
      />
    </section>
  );
};

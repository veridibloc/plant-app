import { useTranslations } from "next-intl";
import Image from "next/image";

export const CollectPointsCta = () => {
  const t = useTranslations("dashboard");

  return (
    <section className="flex justify-start items-start w-full px-8 flex-wrap mt-4">
      <div className="flex items-center justify-between bg-white border rounded-xl p-4 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold max-w-md">
            {t("earn_points_card_title")}
          </h3>
          <h3 className="text-sm text-green-800">
            {t("earn_points_card_cta")}
          </h3>
        </div>

        <div>
          <Image
            src="/assets/trash_icon.webp"
            width={120}
            height={120}
            alt="Picture of a trash bin"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
};

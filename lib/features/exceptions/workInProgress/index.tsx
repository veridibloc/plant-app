import { useTranslations } from "next-intl";
import Image from "next/image";

export const WorkInProgress = () => {
  const t = useTranslations("exceptions");

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] pt-6 px-8  w-full">
      <Image
        src="/assets/work_in_progress.webp"
        width={156}
        height={156}
        alt="Picture of a trash bin"
        unoptimized
      />

      <h3 className="text-lg font-bold text-center">{t("work_in_progress")}</h3>
      <p className="text-center">{t("work_in_progress_second_line")}</p>
    </div>
  );
};

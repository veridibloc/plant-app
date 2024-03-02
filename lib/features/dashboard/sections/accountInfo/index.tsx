import { useTranslations } from "next-intl";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { RiQrCodeFill } from "react-icons/ri";
import { IconButton } from "@/components/IconButton";
import { Modal } from "@/components/Modal";
import { useAccount } from "@/hooks/useAccount";
import QRCode from "react-qr-code";

export const AccountInfo = () => {
  const t = useTranslations("dashboard");
  const { firstName, accountInfo } = useAccount();

  const [isOpenQrModal, setIsOpenQrModal] = useState(false);
  const openQrCodeModal = () => setIsOpenQrModal(true);
  const closeQrCodeModal = () => setIsOpenQrModal(false);

  return (
    <>
      <Modal
        title={t("view_account_qr")}
        onClose={closeQrCodeModal}
        open={isOpenQrModal}
      >
        <QRCode
          size={256}
          style={{
            height: "auto",
            maxWidth: "100%",
            width: "100%",
            padding: "1rem",
          }}
          value={accountInfo?.accountId ?? ""}
          viewBox={`0 0 256 256`}
        />
        <small className="text-center text-neutral-700 font-medium mb-2">
          ID: {accountInfo?.accountId}
        </small>
        <span className="text-center text-neutral-700 font-medium p-4 pt-0">
          {t("account_qr_hint")}
        </span>
      </Modal>

      <section className="flex justify-between items-center w-full px-8">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className=" text-neutral-500">{t("hello")}</span>
            <span className="font-bold mt-[-5px]">{firstName}</span>
          </div>
        </div>

        <div>
          <IconButton Icon={RiQrCodeFill} onClick={openQrCodeModal} />
        </div>
      </section>
    </>
  );
};

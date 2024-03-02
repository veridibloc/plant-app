import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useClerk, UserButton } from "@clerk/nextjs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useAccount } from "@/hooks/useAccount";

export const AccountInfo = () => {
  const t = useTranslations("common");
  const { fullName } = useAccount();
  const { signOut } = useClerk();
  const router = useRouter();

  const logOut = () => signOut(() => router.push("/"));

  return (
    <section className="flex justify-between items-center w-full px-8">
      <div className="flex items-center gap-2 w-1/2">
        <UserButton afterSignOutUrl="/" />
        <span className="font-medium text-sm truncate">{fullName}</span>
      </div>

      <div className="w-1/2 flex justify-end">
        <button
          onClick={logOut}
          type="button"
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-red-100 border border-transparent font-semibold text-red-500 hover:text-white hover:bg-red-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
        >
          <RiLogoutBoxRLine />
          {t("sign_out")}
        </button>
      </div>
    </section>
  );
};

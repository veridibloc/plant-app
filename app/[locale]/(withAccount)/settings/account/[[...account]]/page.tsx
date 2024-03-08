import { UserProfile } from "@clerk/nextjs";
export default function Page() {

  return (
    <div className="mt-8 mb-28 w-full">
      <UserProfile path="/:locale/settings/account" routing="path" />
    </div>
  );
}

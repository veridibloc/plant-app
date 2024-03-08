import {currentUser} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {SignIn} from "@/features/auth";
export default async function Page() {
  const user = await currentUser();
  if (user) return redirect(`/dashboard`);
  return <SignIn />;
}

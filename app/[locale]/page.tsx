import {auth, currentUser, SignedIn} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Home } from "@/features/home";

export default function Page() {
  const {userId} = auth();
  if (userId) return redirect(`/dashboard`);
  return <Home />;
}

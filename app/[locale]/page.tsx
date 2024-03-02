import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Home } from "@/features/home";

export default async function Page() {
  const user = await currentUser();

  if (user) return redirect(`/dashboard`);

  return <Home />;
}

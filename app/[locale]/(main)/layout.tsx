import { Layout } from "@/components/Layout";
import type { ChildrenProps } from "@/types/childrenProps";

export default function RootLayout({ children }: ChildrenProps) {
  return <Layout>{children}</Layout>;
}

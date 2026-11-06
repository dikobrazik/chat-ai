import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { AdminLayout } from "@/components/business/Admin/Layout";

export const metadata: Metadata = {
  title: "Админка",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: PropsWithChildren) {
  return <AdminLayout>{children}</AdminLayout>;
}

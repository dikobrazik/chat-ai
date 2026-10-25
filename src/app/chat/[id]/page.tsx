import type { Metadata } from "next";
import { Chat } from "@/components/business/Chat";

export const metadata: Metadata = {
  title: null,
};

export default function Page() {
  return <Chat />;
}

import type { Metadata } from "next";
import { Search } from "@/components/business/Search";

export const metadata: Metadata = {
  title: "Поиск в чатах",
};

export default function SearchPage() {
  return <Search />;
}

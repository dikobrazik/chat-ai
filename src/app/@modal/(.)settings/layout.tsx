"use client";

import type { PropsWithChildren } from "react";
import { SettingsModal } from "@/components/business/Settings/Modal";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return <SettingsModal>{children}</SettingsModal>;
}

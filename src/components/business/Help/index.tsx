"use client";

import Link from "next/link";
import { Faq } from "@/components/business/Faq";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { FAQ } from "./constants";
import styles from "./Help.module.scss";

export const Help = () => {
  return (
    <div className="flex flex-col gap-6">
      <Text type="xs" color="#6F6F6F" style="regular">
        Часто задаваемые вопросы
      </Text>

      <Faq items={FAQ} />

      <div className={cn(styles.banner, "mt-6")}>
        <Text type="s">Электронная почта</Text>

        <Text type="xs" color="#0F8AFF" style="regular">
          <Link href="mailto:support@jonu.ru">support@jonu.ru</Link>
        </Text>
      </div>
    </div>
  );
};

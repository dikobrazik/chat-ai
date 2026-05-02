"use client";

import Link from "next/link";
import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { FAQ } from "./constants";
import styles from "./Help.module.scss";

export const Help = () => {
  return (
    <div className="flex flex-col gap-6">
      <Text type="xs" color="#6F6F6F" style="regular">
        Часто задаваемые вопросы
      </Text>

      {FAQ.map((item, index) => (
        <>
          <Expander
            key={`faq-item-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              index
            }`}
            defaultOpen={false}
            Header={({ iconClassname }) => (
              <div className="flex justify-between w-full">
                <Text type="s">{item.question}</Text>
                <Icon
                  size={24}
                  className={iconClassname}
                  color="#9C9C9C"
                  name="chevron-down"
                />
              </div>
            )}
          >
            <Text type="s" color="#6F6F6F" style="regular">
              {item.answer}
            </Text>
          </Expander>

          <Divider />
        </>
      ))}

      <Text className="mt-6" type="xs" color="#6F6F6F" style="regular">
        Поддержка
      </Text>

      <div className="flex gap-3">
        <div className={styles.banner}>
          <Text type="xs" color="#6F6F6F" style="regular">
            Ответим быстрее
          </Text>

          <div className="flex flex-col gap-1">
            <Text type="s">Чат в Telegram</Text>

            <Text type="xs" color="#0F8AFF" style="regular">
              <Link href="https://t.me/jonu_support">@jonu_support</Link>
            </Text>
          </div>
        </div>
        <div className={styles.banner}>
          <Text type="xs" color="#6F6F6F" style="regular">
            Ответим в будние с 9 до 18
          </Text>

          <div className="flex flex-col gap-1">
            <Text type="s">Электронная почта</Text>

            <Text type="xs" color="#0F8AFF" style="regular">
              <Link href="mailto:support@jonu.com">support@jonu.com</Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

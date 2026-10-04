"use client";

import Link from "next/link";
import { Fragment } from "react";
import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
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

      {FAQ.map((item) => (
        <Fragment key={item.question}>
          <Expander
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
            <Text
              className={styles.answer}
              type="s"
              color="#6F6F6F"
              style="regular"
            >
              {item.answer}
            </Text>
          </Expander>

          <Divider />
        </Fragment>
      ))}

      <div className={cn(styles.banner, "mt-6")}>
        <Text type="s">Электронная почта</Text>

        <Text type="xs" color="#0F8AFF" style="regular">
          <Link href="mailto:support@jonu.ru">support@jonu.ru</Link>
        </Text>
      </div>
    </div>
  );
};

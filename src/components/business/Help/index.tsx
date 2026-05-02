"use client";

import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { FAQ } from "./constants";

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
    </div>
  );
};

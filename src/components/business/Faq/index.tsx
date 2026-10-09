import { Fragment } from "react";
import { Divider } from "@/components/ui/Divider";
import { Expander } from "@/components/ui/Expander";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import styles from "./Faq.module.scss";

type Props = {
  items: { question: string; answer: string }[];
};

export const Faq = ({ items }: Props) => (
  <>
    {items.map((item) => (
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
  </>
);

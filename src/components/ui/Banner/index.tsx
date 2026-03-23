import type { ReactNode } from "react";
import { Text } from "../Text";
import styles from "./Banner.module.scss";

type BannerProps = {
  title: string;
  description: string;
  action: ReactNode;
};

export const Banner = (props: BannerProps) => {
  return (
    <div className={styles.banner}>
      <div>
        <Text as="div">{props.title}</Text>
        <Text type="xs" color="#6F6F6F" as="div">
          {props.description}
        </Text>
      </div>
      {props.action}
    </div>
  );
};

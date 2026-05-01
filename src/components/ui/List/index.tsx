import type { PropsWithChildren } from "react";
import styles from "./List.module.scss";

type Props = {};

export const List = ({ children }: PropsWithChildren<Props>) => {
  return <ul className={styles.list}>{children}</ul>;
};

type ListItemProps = {};

export const ListItem = ({ children }: PropsWithChildren<ListItemProps>) => {
  return <li className={styles.listItem}>{children}</li>;
};

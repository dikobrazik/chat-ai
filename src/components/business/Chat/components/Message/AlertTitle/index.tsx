import type { ExtraProps } from "streamdown";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import styles from "../Message.module.scss";
import { getAlertType } from "../plugins";
import { ALERT_ICONS } from "./constants";

export const AlertTitle = ({ node }: ExtraProps) => {
  const type = getAlertType(node);

  return (
    <p className={cn("flex items-center gap-2", styles.alertTitle)}>
      <Icon name={ALERT_ICONS[type]} className={styles.alertIcon} aria-hidden />
      {type === "note" && "Примечание"}
      {type === "tip" && "Совет"}
      {type === "important" && "Важно"}
      {type === "warning" && "Внимание"}
      {type === "caution" && "Осторожно"}
    </p>
  );
};

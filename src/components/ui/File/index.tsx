import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Icon from "../Icon";
import type { IconName } from "../Icon/icons";
import { Text } from "../Text";
import { FILE_TYPES_MAP } from "./constants";
import styles from "./File.module.scss";

type Props = {
  isUploaded: boolean;
  progress?: number;
  uploadingText?: string;
  name?: string;
  type?: string;
  size?: number;
};

export const FileComponent = (props: Props) => {
  const { isUploaded, progress = 0, name, type, size, uploadingText } = props;

  const [icon, setIcon] = useState<IconName>("document");

  useEffect(() => {
    if (progress === 100 && icon === "document") {
      setIcon("file-uploaded");

      const timeoutId = setTimeout(() => {
        setIcon("document");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [progress]);

  return (
    <>
      <div className={cn(styles.progress)}>
        <div
          className={styles.progressCircle}
          style={
            { "--value": isUploaded ? 0 : progress } as React.CSSProperties
          }
        >
          <div className={styles.iconWrapper}>
            <Icon
              name={icon}
              size={icon === "document" ? "16" : "32"}
              color={isUploaded ? "#000000" : "#9C9C9C"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <Text type="xs" style="regular">
          {name}
        </Text>
        {isUploaded ? (
          <Text type="xs" style="regular" color="#9C9C9C">
            {type && type in FILE_TYPES_MAP
              ? FILE_TYPES_MAP[type as keyof typeof FILE_TYPES_MAP]
              : type}
            &nbsp;•&nbsp;
            {((size ?? 0) / 1024).toFixed(2)} КБ
          </Text>
        ) : (
          <Text type="xs" style="regular" color="#9C9C9C">
            {uploadingText}
          </Text>
        )}
      </div>
    </>
  );
};

import { useEffect, useRef, useState } from "react";
import { useUploadFiles } from "@/api";
import Button from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import styles from "./File.module.scss";

type Props = {
  file: File;
  removeFile: (fileName: string) => void;
  onUploaded?: (fileName: string, id: string) => void;
};

const UPLOADING_TEXTS = [
  "Изучаю файл ...",
  "Распаковываю данные ...",
  "Файл почти загружен ...",
];

export const File = ({ file, removeFile, onUploaded }: Props) => {
  const uploadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadingTextIndex, setUploadingTextIndex] = useState(0);

  const { mutate, isPending, progress } = useUploadFiles({
    onSettled: () => {
      if (uploadingIntervalRef.current) {
        clearInterval(uploadingIntervalRef.current);
      }
    },
    onSuccess: (ids: string[]) => {
      onUploaded?.(file.name, ids[0]);
      setIsUploaded(true);
    },
  });

  useEffect(() => {
    if (!isUploaded && !isPending) {
      mutate([file]);
      uploadingIntervalRef.current = setInterval(() => {
        setUploadingTextIndex((prev) => (prev + 1) % UPLOADING_TEXTS.length);
      }, 5000);
    }

    return () => {
      if (uploadingIntervalRef.current) {
        clearInterval(uploadingIntervalRef.current);
      }
    };
  }, []);

  return (
    <Button
      key={file.name}
      rightIcon={
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        <div
          role="button"
          tabIndex={0}
          onKeyUp={() => removeFile(file.name)}
          onClick={() => removeFile(file.name)}
        >
          <Icon name="close" />
        </div>
      }
      variant="secondary"
    >
      <div className={cn(styles.progress)}>
        <div
          className={styles.progressCircle}
          style={
            { "--value": isUploaded ? 0 : progress } as React.CSSProperties
          }
        >
          <div className={styles.iconWrapper}>
            <Icon
              name="document"
              size="16"
              color={isUploaded ? "#000000" : "#9C9C9C"}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1">
        <Text type="xs" style="regular">
          {file.name}
        </Text>
        {isUploaded ? (
          <Text type="xs" style="regular" color="#9C9C9C">
            {file.type}&nbsp;•&nbsp;{(file.size / 1024).toFixed(2)} КБ
          </Text>
        ) : (
          <Text type="xs" style="regular" color="#9C9C9C">
            {UPLOADING_TEXTS[uploadingTextIndex]}
          </Text>
        )}
      </div>
    </Button>
  );
};

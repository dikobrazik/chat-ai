import { useEffect, useRef, useState } from "react";
import { useUploadFiles } from "@/api";
import Button from "@/components/ui/Button";
import { FileComponent } from "@/components/ui/File";
import { Icon } from "@/components/ui/Icon";
import { useFiles } from "@/providers/FilesProvider/useFiles";

type Props = {
  fileId: string;
};

const UPLOADING_TEXTS = [
  "Изучаю файл ...",
  "Распаковываю данные ...",
  "Файл почти загружен ...",
];

export const File = ({ fileId }: Props) => {
  const { attachments, getFile, removeFile, onUploaded } = useFiles();

  // восстановленное после логина вложение уже загружено: блоба нет, есть только метаданные
  const attachment = attachments.find((item) => item.id === fileId);

  const uploadingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isUploaded, setIsUploaded] = useState(Boolean(attachment?.isUploaded));
  const [uploadingTextIndex, setUploadingTextIndex] = useState(0);

  const { mutate, isPending, progress } = useUploadFiles({
    onSettled: () => {
      if (uploadingIntervalRef.current) {
        clearInterval(uploadingIntervalRef.current);
      }
    },
    onSuccess: (ids: string[]) => {
      onUploaded?.(fileId, ids[0]);
      setIsUploaded(true);
    },
  });

  const file = getFile(fileId);

  useEffect(() => {
    if (!isUploaded && !isPending && file) {
      mutate([file]);
      uploadingIntervalRef.current = setInterval(() => {
        setUploadingTextIndex((prev) => (prev + 1) % UPLOADING_TEXTS.length);
      }, 1000);
    }

    return () => {
      if (uploadingIntervalRef.current) {
        clearInterval(uploadingIntervalRef.current);
      }
    };
  }, []);

  return (
    <Button
      key={file?.name}
      rightIcon={
        <div onClick={() => removeFile(fileId)}>
          <Icon name="close" />
        </div>
      }
      variant="secondary"
    >
      <FileComponent
        isUploaded={isUploaded}
        progress={progress}
        type={file?.type ?? attachment?.type}
        name={file?.name ?? attachment?.name}
        size={file?.size ?? attachment?.size}
        uploadingText={UPLOADING_TEXTS[uploadingTextIndex]}
      />
    </Button>
  );
};

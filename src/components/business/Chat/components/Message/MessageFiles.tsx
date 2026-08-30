import type { Prompt } from "@/api";
import { FileComponent } from "@/components/ui/File";
import { cn } from "@/lib/utils";
import styles from "./Message.module.scss";

export const MessageFiles = ({
  files,
  role,
}: {
  files: Prompt["files"];
  role: string;
}) => {
  if (!files || files.length === 0) return null;

  return files?.map((file) => (
    <div
      key={file.id}
      className={cn(styles.message, styles[`${role}`], styles.attachment)}
    >
      <div className={styles.file}>
        <FileComponent
          isUploaded
          name={file.name}
          type={file.type}
          size={file.size}
        />
      </div>
    </div>
  ));
};

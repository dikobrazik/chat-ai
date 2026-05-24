import { type ChangeEventHandler, useState } from "react";

export const useFiles = () => {
  const [files, setFiles] = useState<File[]>([]);

  const removeFile = (fileName: string) => {
    if (!files) return;

    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };

  const handleAddFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFiles((files) =>
      [
        ...files,
        ...(event.target.files ? Array.from(event.target.files) : []),
      ].filter((file) => !files.some((f) => f.name === file.name)),
    );
  };

  const onUploadFile = (fileName: string, id: string) => {
    setFiles((files) =>
      files.map((file) => (file.name === fileName ? { ...file, id } : file)),
    );
  };

  return { files, onAddFiles: handleAddFiles, onUploadFile, removeFile };
};

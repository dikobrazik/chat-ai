import { useContext } from "react";
import { FilesContext } from ".";

export const useFiles = () => {
  const { attachments, addFiles, getFile, removeFile, onUploaded } =
    useContext(FilesContext);

  const clearFiles = () => {
    for (const attachment of attachments) {
      removeFile(attachment.id);
    }
  };

  const areAllFilesUploaded = attachments.every(
    (attachment) => attachment.isUploaded,
  );

  return {
    attachments,
    areAllFilesUploaded,
    addFiles,
    getFile,
    clearFiles,
    removeFile,
    onUploaded,
  };
};

import { useContext } from "react";
import { FilesContext } from ".";

export const useFiles = () => {
  const { attachments, addFiles, clearFiles, getFile, removeFile, onUploaded } =
    useContext(FilesContext);

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

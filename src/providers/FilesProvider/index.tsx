import { createContext, useRef, useState } from "react";

export const FilesContext = createContext<{
  attachments: Attachment[];
  addFiles: (files: FileList | null) => void;
  clearFiles: () => void;
  getFile: (id: string) => File | undefined;
  removeFile: (id: string) => void;
  onUploaded: (fileId: string, uploadedFileId: string) => void;
}>({
  attachments: [] as Attachment[],
  addFiles: (_files: FileList | null) => {},
  clearFiles: () => {},
  getFile: (_id: string) => undefined as File | undefined,
  removeFile: (_id: string) => {},
  onUploaded: (_fileId: string, _uploadedFileId: string) => {},
});

type Attachment = {
  id: string;
  name: string;
  type: string;
  size: number;
  isUploaded: boolean;
};

export const FilesProvider = ({ children }: { children: React.ReactNode }) => {
  const filesRef = useRef<Map<string, File>>(new Map());

  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const addFiles = (files: FileList | null) => {
    if (!files) return;

    const items = Array.from(files).map((file) => {
      const id = crypto.randomUUID();

      filesRef.current.set(id, file);

      return {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        isUploaded: false,
      };
    });

    setAttachments((prev) => [...prev, ...items]);
  };

  const getFile = (id: string) => {
    return filesRef.current.get(id);
  };

  const removeFile = (id: string) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((attachment) => attachment.id !== id),
    );

    filesRef.current.forEach((_, fileId) => {
      if (fileId === id) {
        filesRef.current.delete(id);
      }
    });
  };

  const clearFiles = () => {
    setAttachments([]);
    filesRef.current.clear();
  };

  const onUploaded = (fileId: string, uploadedFileId: string) => {
    const file = filesRef.current.get(fileId);
    filesRef.current.delete(fileId);

    if (file) {
      filesRef.current.set(uploadedFileId, file);
    }

    setAttachments((prevAttachments) =>
      prevAttachments.map((attachment) => ({
        ...attachment,
        id: attachment.id === fileId ? uploadedFileId : attachment.id,
        isUploaded: true,
      })),
    );
  };

  return (
    <FilesContext.Provider
      value={{
        attachments,
        addFiles,
        clearFiles,
        getFile,
        removeFile,
        onUploaded,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

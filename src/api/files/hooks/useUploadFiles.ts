import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useUploadFiles = (
  options?: UseMutationOptions<string[], unknown, File[]>,
) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    ...options,
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      return axios
        .post<string[]>(`file-storage/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );

            setProgress(progress);
          },
        })
        .then((response) => response.data);
    },
    onSettled: (...args) => {
      setProgress(0);
      options?.onSettled?.(...args);
    },
  });
  return { ...mutation, progress };
};

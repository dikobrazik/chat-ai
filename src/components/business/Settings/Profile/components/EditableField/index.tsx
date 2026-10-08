"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify/unstyled";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";

type Props = {
  label: string;
  value: string;
  type?: "text" | "email";
  onSave?: (value: string) => Promise<void> | void;
};

export const EditableField = ({
  label,
  value,
  type = "text",
  onSave,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [savedValue, setSavedValue] = useState(value);
  const [draftValue, setDraftValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setSavedValue(value);
    setDraftValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraftValue(savedValue);
    setError(undefined);
    setIsEditing(true);
  };

  const save = async () => {
    if (draftValue === savedValue) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setError(undefined);

    try {
      await onSave?.(draftValue);
      setSavedValue(draftValue);
      setIsEditing(false);
      toast.success("Изменения сохранены");
    } catch {
      setError("Не удалось сохранить изменения");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <Text color="#6F6F6F" type="xs">
        {label}
      </Text>

      <div className="flex gap-2">
        <TextField
          ref={inputRef}
          aria-label={label}
          error={error}
          readOnly={!isEditing}
          type={type}
          value={draftValue}
          onClick={isEditing ? undefined : startEditing}
          onValueChange={setDraftValue}
        />
        <Button
          aria-label={isEditing ? `Сохранить ${label}` : `Изменить ${label}`}
          disabled={isSaving}
          loading={isSaving}
          variant="base"
          leftIcon={<Icon name={isEditing ? "check" : "edit"} />}
          onClick={isEditing ? save : startEditing}
        />
      </div>
    </div>
  );
};

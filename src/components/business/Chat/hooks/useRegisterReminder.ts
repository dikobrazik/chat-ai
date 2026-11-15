import type { Dispatch, SetStateAction } from "react";
import type { Prompt } from "@/api";
import { useAuthContext } from "@/providers/AuthProvider/hooks";
import {
  countGuestPrompt,
  isRegisterReminderPrompt,
} from "@/utils/guest-prompts";
import { REGISTER_REMINDER_MESSAGE_ID } from "../components/Message/constants";
import { withoutRegisterReminder } from "./utils";

export const useRegisterReminder = (
  setMessages: Dispatch<SetStateAction<Prompt[]>>,
) => {
  const { isGuest } = useAuthContext();

  const onPromptComplete = () => {
    if (!isGuest || !isRegisterReminderPrompt(countGuestPrompt())) return;

    setMessages((prevMessages) => [
      {
        id: REGISTER_REMINDER_MESSAGE_ID,
        text: "",
        role: "model",
        isStreaming: false,
        files: [],
      },
      ...withoutRegisterReminder(prevMessages),
    ]);
  };

  const closeRegisterReminder = () => setMessages(withoutRegisterReminder);

  return { onPromptComplete, closeRegisterReminder };
};

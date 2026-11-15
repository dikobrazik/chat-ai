import {
  GUEST_PROMPTS_COUNT_LOCAL_STORAGE_KEY,
  REGISTER_REMINDER_FIRST_PROMPT,
  REGISTER_REMINDER_PROMPT_STEP,
} from "@/constants/guest";

const getGuestPromptsCount = () =>
  Number(localStorage.getItem(GUEST_PROMPTS_COUNT_LOCAL_STORAGE_KEY)) || 0;

export const countGuestPrompt = () => {
  const count = getGuestPromptsCount() + 1;

  localStorage.setItem(GUEST_PROMPTS_COUNT_LOCAL_STORAGE_KEY, String(count));

  return count;
};

export const isRegisterReminderPrompt = (count: number) =>
  count >= REGISTER_REMINDER_FIRST_PROMPT &&
  (count - REGISTER_REMINDER_FIRST_PROMPT) % REGISTER_REMINDER_PROMPT_STEP ===
    0;

import type { Model, Profile } from "@/api";

const USER_STATUSES = [
  "guest",
  "active",
  "subscription_base",
  "subscription_plus",
  "subscription_pro",
];

// пока профиль не загружен, считаем пользователя гостем: иначе на старте
// «недоступны» вообще все модели и дефолтом выбирается запрещённая гостю
export const isOptionDisabled = (profile?: Profile) => (option: Model) =>
  USER_STATUSES.indexOf(option.available_for_status) >
  USER_STATUSES.indexOf(profile?.status ?? "guest");

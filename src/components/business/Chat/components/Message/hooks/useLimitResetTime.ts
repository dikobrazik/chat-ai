import {
  formatDayMonth,
  formatTime,
  getDaysFromToday,
} from "@/utils/format-time";

export const useLimitResetTime = (resetAt: number) => {
  const daysLeft = getDaysFromToday(resetAt);

  return {
    isToday: daysLeft <= 0,
    isTomorrow: daysLeft === 1,
    time: formatTime(resetAt),
    date: formatDayMonth(resetAt),
  };
};

export const formatTime = (date: number | Date) =>
  new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

export const formatDayMonth = (date: number | Date) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
  }).format(date);

export const formatDays = (days: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "unit",
    unit: "day",
    unitDisplay: "long",
  }).format(days);

const getCalendarDay = (date: number | Date) => {
  const day = new Date(date);

  return Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
};

export const getDaysFromToday = (date: number | Date) =>
  Math.round((getCalendarDay(date) - getCalendarDay(Date.now())) / 86_400_000);

export const formatTime = (date: number | Date) =>
  new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

export const formatDays = (days: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "unit",
    unit: "day",
    unitDisplay: "long",
  }).format(days);

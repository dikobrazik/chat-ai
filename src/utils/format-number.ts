export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU", { notation: "compact" }).format(value);

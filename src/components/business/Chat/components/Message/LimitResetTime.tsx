import { useLimitResetTime } from "./hooks/useLimitResetTime";

type LimitResetTimeProps = {
  resetAt: number;
};

export const LimitResetTime = ({ resetAt }: LimitResetTimeProps) => {
  const { isToday, isTomorrow, time, date } = useLimitResetTime(resetAt);

  if (isToday) return `Обновится в ${time}.`;

  if (isTomorrow) return `Обновится завтра в ${time}.`;

  return `Обновится ${date}.`;
};

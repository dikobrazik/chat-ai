import { cn } from "@/lib/utils";
import type { SuccessKind } from "../../utils";
import { SummaryRow } from "../SummaryRow";
import styles from "./ChargeSummary.module.scss";

type Props = {
  kind: SuccessKind;
  todayAmount?: string | null;
  nextAmount?: string | null;
  periodLabel?: string | null;
  nextChargeDate?: string;
};

export const ChargeSummary = ({
  kind,
  todayAmount,
  nextAmount,
  periodLabel,
  nextChargeDate,
}: Props) => (
  <div className={cn("flex flex-col gap-4 w-full", styles.summary)}>
    {kind === "trial" && (
      <SummaryRow
        title="Сегодня"
        value={todayAmount}
        hint="Плата за активацию пробного периода"
      />
    )}
    {kind === "paid" && (
      <SummaryRow
        title="Сегодня"
        value={todayAmount}
        hint={`Оплата за ${periodLabel}`}
      />
    )}
    <SummaryRow
      title={nextChargeDate}
      value={nextAmount}
      hint={
        kind === "trial"
          ? `Спишем за ${periodLabel}, если не отключите автопродление`
          : "Следующее списание, автопродление включено"
      }
    />
  </div>
);

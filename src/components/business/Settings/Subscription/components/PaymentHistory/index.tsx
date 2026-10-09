import Link from "next/link";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { formatKopecks } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { PAYMENT_STATUS_COLOR } from "./constants";
import styles from "./PaymentHistory.module.scss";
import { usePaymentHistory } from "./usePaymentHistory";

export const PaymentHistory = () => {
  const { payments, email, hasMore, isLoading, onShowMore } =
    usePaymentHistory();

  if (isLoading) {
    return <Skeleton isLoading height={160} />;
  }

  if (!payments.length) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Text type="s">История платежей</Text>
        {email && (
          <Text type="xs" color="#6F6F6F" style="regular">
            Кассовые чеки приходят на {email}
          </Text>
        )}
      </div>

      <div className={styles.table}>
        <div className={styles.head}>
          <Text type="xs" color="#6F6F6F" style="regular">
            Дата
          </Text>
          <Text type="xs" color="#6F6F6F" style="regular">
            Сумма
          </Text>
          <Text type="xs" color="#6F6F6F" style="regular">
            Статус
          </Text>
          <Text type="xs" color="#6F6F6F" style="regular">
            Чек
          </Text>
        </div>

        {payments.map((payment) => (
          <div key={payment.id} className={styles.row}>
            <Text className={styles.date} type="s" style="regular">
              {formatDate(payment.payment_date)}
            </Text>
            <Text className={styles.amount} type="s" style="regular">
              {formatKopecks(payment.amount)}
            </Text>
            <Text
              className={styles.status}
              type="s"
              style="regular"
              color={PAYMENT_STATUS_COLOR[payment.status]}
            >
              {payment.status === "confirmed" && "Оплачено"}
              {payment.status === "rejected" && "Не прошла"}
              {payment.status === "refunded" && "Возврат"}
            </Text>
            {!payment.receipt_url && payment.status !== "rejected" && (
              <Text
                className={styles.receipt}
                type="s"
                color="#9C9C9C"
                style="regular"
              >
                Отправлен на почту
              </Text>
            )}
            {payment.receipt_url && (
              <Text
                className={styles.receipt}
                type="s"
                color="#0F8AFF"
                style="regular"
              >
                <Link
                  href={payment.receipt_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Чек по операции
                </Link>
              </Text>
            )}
          </div>
        ))}
      </div>

      {hasMore && (
        <Button className="self-center" variant="base" onClick={onShowMore}>
          Показать ещё
        </Button>
      )}
    </section>
  );
};

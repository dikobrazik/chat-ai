"use client";

import { getSubscription } from "@/api";
import { useQuery } from "@tanstack/react-query";
import styles from "./Subscription.module.scss";

const plans = {
  basic: "Базовый",
  plus: "Плюс",
  pro: "Профессиональный",
};

export default function SubsriptionPage() {
  const { data } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });

  if (!data) {
    return <div>Загрузка...</div>;
  }

  const { subscription, payments } = data;

  return (
    <>
      <h1>Подписка</h1>

      <div className={styles.currentPlanCard}>
        <div>
          Текущий тарифный план -{" "}
          {plans[subscription.plan as keyof typeof plans]}
        </div>
        <div>
          Активен до{" "}
          {new Date(subscription.current_period_end).toLocaleString()}
        </div>
      </div>

      <h2>История платежей</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Статус</th>
            <th>Сумма Р</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{new Date(payment.payment_date).toLocaleString()}</td>
              <td>{payment.status}</td>
              <td>{payment.amount / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

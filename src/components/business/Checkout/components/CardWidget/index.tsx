"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import { initPayment } from "@/api";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { KASSA_TERMINAL_KEY } from "@/config";
import { SUPPORT_EMAIL } from "../../constants";
import styles from "./CardWidget.module.scss";

type Props = {
  plan: string;
  isSixMonths: boolean;
};

const INTEGRATION_SCRIPT_SRC = "https://integrationjs.tbank.ru/integration.js";

export const CardWidget = ({ plan, isSixMonths }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    KASSA_TERMINAL_KEY ? "loading" : "error",
  );

  // форма инициализируется один раз, а тариф и период пользователь может
  // переключить свитчером после этого — берём их из рефа, не из замыкания
  const paymentRef = useRef({ plan, isSixMonths });
  paymentRef.current = { plan, isSixMonths };

  // onReady, а не onLoad: next/script держит загруженные скрипты в модульном
  // LoadCache и на повторном монтировании onLoad уже не зовёт — форма карты
  // после переключения на TPay и обратно осталась бы вечным спиннером
  const onIntegrationReady = () => {
    if (isInitializedRef.current) return;

    if (!KASSA_TERMINAL_KEY || !containerRef.current) {
      setStatus("error");
      return;
    }

    isInitializedRef.current = true;

    window.PaymentIntegration.init({
      terminalKey: KASSA_TERMINAL_KEY,
      product: "eacq",
      features: {
        iframe: {
          container: containerRef.current,
          paymentStartCallback: async () => {
            const { paymentURL } = await initPayment({
              plan: paymentRef.current.plan,
              sixMonths: paymentRef.current.isSixMonths,
            });

            return paymentURL;
          },
          config: {
            loadedCallback: () => setStatus("ready"),
          },
        },
      },
    }).catch(() => {
      isInitializedRef.current = false;
      setStatus("error");
    });
  };

  if (status === "error") {
    return (
      <Text style="regular" type="s" color="#FC3F1D">
        Форма оплаты картой не загрузилась. Выберите TPay или СБП, а если не
        помогло — напишите нам на{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
      </Text>
    );
  }

  return (
    <div className={styles.wrapper}>
      {status === "loading" && (
        <div className={styles.loader}>
          <Spinner />
        </div>
      )}
      <div ref={containerRef} />

      <Script
        src={INTEGRATION_SCRIPT_SRC}
        onReady={onIntegrationReady}
        onError={() => setStatus("error")}
        async
      />
    </div>
  );
};

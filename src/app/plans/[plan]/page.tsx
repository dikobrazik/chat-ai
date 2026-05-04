"use client";

import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useRef, useState } from "react";
import { initPayment } from "@/api";
import Modal from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";

export default function PlanPage() {
  const iframeContainerRef = useRef(null);
  const integrationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const { plan } = useParams();
  const router = useRouter();

  const onPaymentIntegrationLoad = () => {
    const initConfig = {
      terminalKey: process.env.NEXT_PUBLIC_KASSA_TERMINAL_KEY!, // Значение TerminalKey из личного кабинета
      product: "eacq",
      features: {
        iframe: {
          container: iframeContainerRef.current!,
          paymentStartCallback: async (paymentType: string) => {
            const res = await initPayment({
              paymentType,
              plan: plan as string,
            }); // URL — это URL вашего бэкенд-сервиса, который вызовет метод «Инициировать платеж»
            return res.PaymentURL;
          },
          config: {
            loadedCallback: () => {
              setIsLoading(false);
            },
          },
        },
      },
    };

    window.PaymentIntegration.init(initConfig)
      .then((integration) => {
        integrationRef.current = integration;
      })
      .catch(console.log);
  };

  return (
    <div>
      <Modal isOpen onClose={() => router.back()}>
        <div className="h-[380px]" ref={iframeContainerRef}>
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          )}
        </div>
      </Modal>

      <Script
        src="https://integrationjs.tbank.ru/integration.js"
        onLoad={onPaymentIntegrationLoad}
        async
      ></Script>
    </div>
  );
}

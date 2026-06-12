"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useRef, useState } from "react";
import { initPayment } from "@/api";
import { SIX_MONTHS_QUERY_KEY } from "@/components/business/Subscription/constants";
import Modal from "@/components/ui/Modal";
import { Spinner } from "@/components/ui/Spinner";

export default function PlanPage() {
  const iframeContainerRef = useRef(null);
  const integrationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const { plan } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

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
              sixMonths: searchParams.get(SIX_MONTHS_QUERY_KEY) === "true",
            });

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

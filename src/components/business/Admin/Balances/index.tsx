import { Text } from "@/components/ui/Text";
import { BalanceCard } from "./components/BalanceCard";
import { PROVIDER_BILLING_URLS } from "./constants";

export const AdminBalances = () => (
  <div className="flex flex-col gap-4">
    <Text type="s" style="regular" color="#6F6F6F">
      Остаток на счёте смотрим в кабинетах провайдеров
    </Text>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(PROVIDER_BILLING_URLS).map(([provider, url]) => (
        <BalanceCard key={provider} provider={provider} url={url} />
      ))}
    </div>
  </div>
);

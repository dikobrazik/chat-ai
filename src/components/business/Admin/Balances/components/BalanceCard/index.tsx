import type { ProviderBalance } from "@/api";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { formatMoney } from "@/utils/format-currency";
import { ProviderName } from "../../../components/ProviderName";
import { PROVIDER_BILLING_URLS } from "../../constants";
import styles from "./BalanceCard.module.scss";

type Props = {
  balance: ProviderBalance;
};

export const BalanceCard = ({ balance }: Props) => (
  <div className={styles.card}>
    <ProviderName provider={balance.provider} />
    {balance.balance !== null && balance.currency ? (
      <Text type="xl">{formatMoney(balance.balance, balance.currency)}</Text>
    ) : (
      <Text type="s" style="regular" color="#6F6F6F">
        Провайдер не отдаёт остаток по API
      </Text>
    )}
    <Button
      className="self-start"
      href={PROVIDER_BILLING_URLS[balance.provider]}
      target="_blank"
      rel="noreferrer"
    >
      <Text type="s" style="regular">
        Кабинет провайдера
      </Text>
    </Button>
  </div>
);

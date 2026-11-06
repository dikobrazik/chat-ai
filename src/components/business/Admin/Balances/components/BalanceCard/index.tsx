import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { ProviderName } from "../../../components/ProviderName";
import styles from "./BalanceCard.module.scss";

type Props = {
  provider: string;
  url: string;
};

export const BalanceCard = ({ provider, url }: Props) => (
  <div className={styles.card}>
    <ProviderName provider={provider} />
    <Button className="self-start" href={url} target="_blank" rel="noreferrer">
      <Text type="s" style="regular">
        Открыть кабинет
      </Text>
    </Button>
  </div>
);

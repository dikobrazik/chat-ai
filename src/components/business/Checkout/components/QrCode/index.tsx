import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./QrCode.module.scss";

type Props = {
  svg?: string;
  isLoading: boolean;
};

export const QrCode = ({ svg, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton isLoading height={176} width={176} />;
  }

  return (
    <div
      role="img"
      aria-label="QR-код СБП"
      className={styles.qr}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
    ></div>
  );
};

import Image from "next/image";
import { Text } from "@/components/ui/Text";
import { PROVIDER_TITLES } from "../../constants";
import { getProviderIcon } from "../../utils";

type Props = {
  provider: string;
};

export const ProviderName = ({ provider }: Props) => (
  <div className="flex flex-row items-center gap-2">
    <Image src={getProviderIcon(provider)} width={20} height={20} alt="" />
    <Text type="s" style="regular">
      {PROVIDER_TITLES[provider] ?? provider}
    </Text>
  </div>
);

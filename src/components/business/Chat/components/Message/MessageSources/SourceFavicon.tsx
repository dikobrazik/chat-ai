import Image from "next/image";
import { getFaviconUrl } from "./utils";

type Props = {
  host: string;
  className: string;
};

export const SourceFavicon = ({ host, className }: Props) => (
  <Image
    src={getFaviconUrl(host)}
    width={16}
    height={16}
    alt=""
    loading="eager"
    className={className}
  />
);

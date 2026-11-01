import Image from "next/image";
import type { ExtraProps } from "streamdown";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import styles from "./AnswerImage.module.scss";
import { useAnswerImage } from "./useAnswerImage";

type AnswerImageProps = ExtraProps & {
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
  caption?: string;
  fallback?: string;
};

export const AnswerImage = ({
  src = "",
  alt = "",
  title,
  href,
  caption,
  fallback,
}: AnswerImageProps) => {
  const { isBroken, onError } = useAnswerImage(src);

  return (
    <span className={styles.answerImage}>
      {!isBroken && (
        <Image
          className={styles.picture}
          src={src}
          alt={alt}
          title={title}
          width={0}
          height={0}
          sizes="100vw"
          unoptimized
          onError={onError}
        />
      )}
      {href && (
        <a
          className={cn("wrap-anywhere font-medium underline", styles.link)}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-streamdown="link"
        >
          <Icon name="gallery" size={16} className={styles.icon} aria-hidden />
          {caption}
        </a>
      )}
      {!href && isBroken && fallback}
    </span>
  );
};

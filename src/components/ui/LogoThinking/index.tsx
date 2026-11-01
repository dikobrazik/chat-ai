import { memo } from "react";
import { cn } from "@/lib/utils";
import { SIZE_MAP } from "./constants";
import styles from "./LogoThinking.module.scss";

type LogoThinkingProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

export const LogoThinking = memo(({ size, className }: LogoThinkingProps) => {
  const px = SIZE_MAP[size || "medium"];

  return (
    <svg
      viewBox="0 0 36 36"
      width={px}
      height={px}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(styles.logo, className)}
      aria-hidden="true"
    >
      <g className={styles.sign}>
        <g clipPath="url(#ltp-clip)">
          <path
            d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z"
            fill="#0F8AFF"
          />
          <path d="M15 -10L27 27.5L-31 16.5L15 -10Z" fill="url(#ltp-beam)" />
          <circle
            className={styles.bloom}
            cx="23"
            cy="23.5"
            r="10"
            fill="url(#ltp-bloom)"
          />
          <circle
            className={styles.flash}
            cx="18"
            cy="18"
            r="18"
            fill="#FFFFFF"
          />
        </g>
        <circle
          className={cn(styles.ring, styles.ring1)}
          cx="23"
          cy="23.5"
          r="4.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.6"
        />
        <circle
          className={cn(styles.ring, styles.ring2)}
          cx="23"
          cy="23.5"
          r="4.5"
          fill="none"
          stroke="#ADDBFF"
          strokeWidth="1.6"
        />
        <circle
          className={cn(styles.ring, styles.ring3)}
          cx="23"
          cy="23.5"
          r="4.5"
          fill="none"
          stroke="#FF6B34"
          strokeWidth="1.6"
        />
        <circle
          className={styles.wave1}
          cx="23"
          cy="23.5"
          r="4.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <circle
          className={styles.wave2}
          cx="18"
          cy="18"
          r="8"
          fill="none"
          stroke="#ADDBFF"
          strokeWidth="1.2"
        />
        <g className={styles.glow}>
          <circle cx="23" cy="23.5" r="9" fill="url(#ltp-glow)" />
          <circle
            className={styles.glowWarm}
            cx="23"
            cy="23.5"
            r="9"
            fill="url(#ltp-glow-warm)"
          />
        </g>
        <g className={cn(styles.spark, styles.spark1)}>
          <g className={styles.tw}>
            <circle cx="23" cy="23.5" r="4.2" fill="url(#ltp-halo-white)" />
            <circle cx="23" cy="23.5" r="2.2" fill="#FFFFFF" />
          </g>
        </g>
        <g className={cn(styles.spark, styles.spark2)}>
          <g className={cn(styles.tw, styles.tw2)}>
            <circle cx="23" cy="23.5" r="4.2" fill="url(#ltp-halo-blue)" />
            <circle cx="23" cy="23.5" r="2.2" fill="#ADDBFF" />
            <circle cx="23" cy="23.5" r="1.1" fill="#FFFFFF" />
          </g>
        </g>
        <g className={cn(styles.spark, styles.spark3)}>
          <g className={cn(styles.tw, styles.tw3)}>
            <circle cx="23" cy="23.5" r="4.2" fill="url(#ltp-halo-orange)" />
            <circle cx="23" cy="23.5" r="2.2" fill="#FF6B34" />
            <circle cx="23" cy="23.5" r="1.1" fill="#FFFFFF" />
          </g>
        </g>
        <circle
          className={styles.core}
          cx="23"
          cy="23.5"
          r="4"
          fill="#FFFFFF"
        />
      </g>
      <defs>
        <clipPath id="ltp-clip">
          <path d="M0 18C0 8.05888 8.05888 0 18 0C27.9411 0 36 8.05888 36 18C36 27.9411 27.9411 36 18 36C8.05888 36 0 27.9411 0 18Z" />
        </clipPath>
        <linearGradient
          id="ltp-beam"
          x1="2.50003"
          y1="6.00001"
          x2="23"
          y2="24.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#0F8AFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ltp-glow">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ltp-glow-warm">
          <stop offset="0" stopColor="#FFC09A" stopOpacity="0.85" />
          <stop offset="0.4" stopColor="#FFC09A" stopOpacity="0.4" />
          <stop offset="1" stopColor="#FFC09A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ltp-bloom">
          <stop offset="0" stopColor="#FF6B34" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#FF6B34" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FF6B34" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ltp-halo-white">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ltp-halo-blue">
          <stop offset="0" stopColor="#ADDBFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ADDBFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ltp-halo-orange">
          <stop offset="0" stopColor="#FF6B34" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FF6B34" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
});

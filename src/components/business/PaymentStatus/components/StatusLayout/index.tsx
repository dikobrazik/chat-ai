import type { PropsWithChildren, ReactNode } from "react";
import { Text } from "@/components/ui/Text";

type Props = {
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  live?: "polite" | "assertive";
};

export const StatusLayout = ({
  icon,
  title,
  description,
  live,
  children,
}: PropsWithChildren<Props>) => (
  <div
    aria-live={live}
    className="flex flex-col items-center gap-6 text-center"
  >
    {icon}
    <div className="flex flex-col items-center gap-2">
      <Text as="h1" type="l">
        {title}
      </Text>
      {description && (
        <Text style="regular" type="m" color="#6F6F6F">
          {description}
        </Text>
      )}
    </div>
    {children}
  </div>
);

import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

type Props = {
  title: string;
  href: string;
  edition?: string;
};

export const DocumentRow = ({ title, href, edition }: Props) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex flex-col gap-1">
      <Text type="xs" color="#6F6F6F" style="regular">
        {title}
      </Text>

      {edition && (
        <Text type="xs" color="#9C9C9C" style="regular">
          {edition}
        </Text>
      )}
    </div>

    <Button
      variant="base"
      href={href}
      target="_blank"
      aria-label={`Посмотреть: ${title}`}
    >
      Посмотреть
    </Button>
  </div>
);

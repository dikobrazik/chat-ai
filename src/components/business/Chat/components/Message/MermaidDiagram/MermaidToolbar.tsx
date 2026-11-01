import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Popover from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { useCopyMessage } from "../hooks/useCopyMessage";
import styles from "./MermaidDiagram.module.scss";
import { renderMermaid } from "./mermaid";
import { downloadSvg } from "./svg";

type Props = {
  code: string;
  isCodeShown: boolean;
  onCodeToggle: () => void;
  onExpand: () => void;
};

export const MermaidToolbar = ({
  code,
  isCodeShown,
  onCodeToggle,
  onExpand,
}: Props) => {
  const { isCopied, onCopyClick } = useCopyMessage(code);

  const onDownloadClick = () =>
    renderMermaid(code, "light").then(({ svg }) => downloadSvg(svg));

  return (
    <div className={styles.toolbar}>
      <Popover
        Trigger={(props) => (
          <Button
            {...props}
            className={cn(props.className, styles.toolbarButton)}
            leftIcon={<Icon name="more" size={16} />}
            aria-label="Действия со схемой"
          />
        )}
        position={["bottom", "top"]}
        align="end"
      >
        <div className="flex flex-col gap-1">
          <Button leftIcon={<Icon name="eye" />} onClick={onCodeToggle}>
            {isCodeShown ? "Скрыть код" : "Показать код"}
          </Button>
          <Button
            leftIcon={<Icon name={isCopied ? "check" : "copy"} />}
            onClick={onCopyClick}
          >
            {isCopied ? "Скопировано" : "Скопировать код"}
          </Button>
          <Button leftIcon={<Icon name="import" />} onClick={onDownloadClick}>
            Скачать SVG
          </Button>
        </div>
      </Popover>
      <Button
        className={styles.toolbarButton}
        leftIcon={<Icon name="maximize" size={16} />}
        aria-label="На весь экран"
        onClick={onExpand}
      />
    </div>
  );
};

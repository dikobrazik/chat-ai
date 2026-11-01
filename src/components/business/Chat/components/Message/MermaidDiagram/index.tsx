import {
  CodeBlock,
  CodeBlockCopyButton,
  CodeBlockDownloadButton,
  type CustomRendererProps,
} from "streamdown";
import { useModal } from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { useToggle } from "@/hooks/useToggle";
import styles from "./MermaidDiagram.module.scss";
import { MermaidFullscreen } from "./MermaidFullscreen";
import { MermaidToolbar } from "./MermaidToolbar";
import { useMermaidDiagram } from "./useMermaidDiagram";
import { useSvgRef } from "./useSvgRef";

export const MermaidDiagram = ({
  code,
  language,
  isIncomplete,
}: CustomRendererProps) => {
  const { svg, lineNumbers, isFailed } = useMermaidDiagram(code, isIncomplete);
  const diagramRef = useSvgRef(svg ?? "");
  const { active: isCodeShown, toggle: toggleCode } = useToggle();
  const { isOpen, openModal, closeModal } = useModal();

  const codeBlock = (
    <CodeBlock
      code={code}
      language={language}
      isIncomplete={isIncomplete}
      lineNumbers={lineNumbers}
    >
      <CodeBlockDownloadButton language={language} />
      <CodeBlockCopyButton />
    </CodeBlock>
  );

  if (!svg) {
    return (
      <>
        {codeBlock}
        {isFailed && (
          <Text as="p" type="s" style="regular" className={styles.note}>
            Не удалось построить диаграмму — показан её код
          </Text>
        )}
      </>
    );
  }

  return (
    <div className={styles.block}>
      <MermaidToolbar
        code={code}
        isCodeShown={isCodeShown}
        onCodeToggle={toggleCode}
        onExpand={openModal}
      />
      <div
        ref={diagramRef}
        aria-label="Диаграмма"
        className={styles.diagram}
        role="img"
      />
      {isCodeShown && codeBlock}
      <MermaidFullscreen svg={svg} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

import {
  CodeBlock,
  CodeBlockContainer,
  CodeBlockCopyButton,
  CodeBlockDownloadButton,
  CodeBlockHeader,
  type CustomRendererProps,
} from "streamdown";
import { Text } from "@/components/ui/Text";
import styles from "./MermaidDiagram.module.scss";
import { useMermaidDiagram } from "./useMermaidDiagram";

export const MermaidDiagram = ({
  code,
  language,
  isIncomplete,
}: CustomRendererProps) => {
  const { svg, diagramRef, lineNumbers, isFailed } = useMermaidDiagram(
    code,
    isIncomplete,
  );

  if (!svg) {
    return (
      <>
        <CodeBlock
          code={code}
          language={language}
          isIncomplete={isIncomplete}
          lineNumbers={lineNumbers}
        >
          <CodeBlockDownloadButton language={language} />
          <CodeBlockCopyButton />
        </CodeBlock>
        {isFailed && (
          <Text as="p" type="s" style="regular" className={styles.note}>
            Не удалось построить диаграмму — показан её код
          </Text>
        )}
      </>
    );
  }

  return (
    <CodeBlockContainer language={language}>
      <CodeBlockHeader language={language} />
      <div className="pointer-events-none sticky top-2 z-10 -mt-10 flex h-8 items-center justify-end">
        <div
          className="pointer-events-auto flex items-center gap-2 px-1.5 py-1"
          data-streamdown="code-block-actions"
        >
          <CodeBlockCopyButton code={code} />
        </div>
      </div>
      <div
        ref={diagramRef}
        aria-label="Диаграмма"
        className={styles.diagram}
        role="img"
      />
    </CodeBlockContainer>
  );
};

import { Modal } from "@/components/ui/Modal";
import styles from "./MermaidDiagram.module.scss";
import { useSvgRef } from "./useSvgRef";

type Props = {
  svg: string;
  isOpen: boolean;
  onClose: () => void;
};

export const MermaidFullscreen = ({ svg, isOpen, onClose }: Props) => {
  const diagramRef = useSvgRef(svg);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      headerBorder={false}
    >
      <div
        ref={diagramRef}
        aria-label="Диаграмма"
        className={styles.fullscreenDiagram}
        role="img"
      />
    </Modal>
  );
};

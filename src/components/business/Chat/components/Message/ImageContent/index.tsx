import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { Text } from "@/components/ui/Text";
import { useToggle } from "@/hooks/useToggle";
import { ModelTyping } from "../ModelTyping";
import styles from "./ImageContent.module.scss";
import { useImageUrl } from "./useImageUrl";

type ImageContentProps = {
  chatId: string;
  promptId: string;
};

export const ImageContent = ({ chatId, promptId }: ImageContentProps) => {
  const { active: isPreviewOpen, toggleOff, toggleOn } = useToggle();
  const { imageUrl, isLoading, isUnavailable, onImageError } = useImageUrl(
    chatId,
    promptId,
  );

  if (isLoading) {
    return <ModelTyping />;
  }

  if (isUnavailable) {
    return (
      <Text style="regular" className={styles.unavailable}>
        Не удалось загрузить изображение
      </Text>
    );
  }

  return (
    <>
      <div className="relative w-[60%]">
        <button
          type="button"
          className="block cursor-zoom-in border-0 bg-transparent p-0"
          onClick={() => toggleOn()}
        >
          {/* biome-ignore lint/performance/noImgElement: тут впадлу использовать компонент Image, так как он не поддерживает динамические src */}
          <img
            src={imageUrl}
            alt="AI response"
            width="100%"
            className="rounded-3xl"
            onError={onImageError}
          />
        </button>
        <Button
          href={imageUrl}
          download
          className="absolute bottom-4 right-4"
          leftIcon={<Icon color="black" name="import" />}
        />
      </div>
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => toggleOff()}
        className={styles.preview}
        showCloseButton={false}
        size="fullscreen"
      >
        <Button
          className={styles.previewClose}
          leftIcon={<Icon name="close" />}
          aria-label="Close image preview"
          variant="base"
          onClick={() => toggleOff()}
        />
        {/* biome-ignore lint/performance/noImgElement: тут впадлу использовать компонент Image, так как он не поддерживает динамические src */}
        <img src={imageUrl} alt="AI response" className={styles.previewImage} />
      </Modal>
    </>
  );
};

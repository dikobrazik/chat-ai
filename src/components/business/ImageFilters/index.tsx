import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { IMAGE_FILTERS, type ImageFilter } from "./filters";
import styles from "./ImageFilters.module.scss";

type ImageFiltersProps = {
  onSelect: (filter: ImageFilter) => void;
};

export const ImageFilters = ({ onSelect }: ImageFiltersProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const list = listRef.current;

    if (!list) return;

    setCanScrollLeft(list.scrollLeft > 0);
    setCanScrollRight(
      list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
    );
  };

  useEffect(() => {
    updateArrows();
  }, []);

  const scrollByDirection = (direction: 1 | -1) => () => {
    const list = listRef.current;

    if (!list) return;

    // цель — точная граница карточки, иначе scroll-snap отменяет плавный скролл
    const [first, second] = list.children;
    const step =
      first instanceof HTMLElement && second instanceof HTMLElement
        ? second.offsetLeft - first.offsetLeft
        : list.clientWidth;
    const cardsPerView = Math.max(1, Math.floor(list.clientWidth / step));

    list.scrollTo({
      left:
        (Math.round(list.scrollLeft / step) + direction * cardsPerView) * step,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Text style="regular">Создать изображение</Text>
        <div className={cn("flex gap-1", styles.arrows)}>
          <Button
            variant="outline"
            borderRadius="full"
            disabled={!canScrollLeft}
            leftIcon={<Icon name="chevron-down" className={styles.arrowLeft} />}
            onClick={scrollByDirection(-1)}
          />
          <Button
            variant="outline"
            borderRadius="full"
            disabled={!canScrollRight}
            leftIcon={
              <Icon name="chevron-down" className={styles.arrowRight} />
            }
            onClick={scrollByDirection(1)}
          />
        </div>
      </div>

      <div ref={listRef} className={styles.list} onScroll={updateArrows}>
        {IMAGE_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={styles.card}
            onClick={() => onSelect(filter)}
          >
            <Image
              src={`/images/image-filters/${filter.id}.webp`}
              alt={filter.title}
              fill
              sizes="112px"
              className={styles.cardImage}
            />
            <Text type="xs" style="regular" className={styles.cardTitle}>
              {filter.title}
            </Text>
          </button>
        ))}
      </div>
    </div>
  );
};

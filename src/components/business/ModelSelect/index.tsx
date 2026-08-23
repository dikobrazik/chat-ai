"use client";

import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import Image from "next/image";
import { useState } from "react";
import Select, { components } from "react-select";
import { getProfile, type Model } from "@/api";
import Icon from "@/components/ui/Icon";
import { useIsMobile } from "@/hooks/useMobile";
import styles from "./ModelSelect.module.scss";
import { isOptionDisabled } from "./modelAccess";
import { getModelDisplay } from "./modelDisplay";
import { useModel } from "./useModel";

export const ModelSelect = () => {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    refetchInterval: false,
  });

  const { providers, providersById, selectedModel, onModelChange } = useModel();

  const isMobile = useIsMobile();
  // меню управляемое, чтобы на мобилке закрывать шторку тапом по оверлею
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!providers) return null;

  return (
    <Select<Model>
      isSearchable={false}
      isMulti={false}
      value={selectedModel}
      isOptionSelected={(option, selectedValue) =>
        option.id === selectedValue?.[0]?.id
      }
      onChange={onModelChange}
      className={styles.select}
      classNames={{
        indicatorSeparator: () => styles.indicatorSeparator,
        indicatorsContainer: () => styles.indicatorsContainer,
        control: (state) =>
          cn(styles.control, state.menuIsOpen && styles.controlOpen),
        menuPortal: () => styles.menuPortal,
        menu: () => styles.menu,
        menuList: () => styles.menuList,
        option: (state) =>
          cn(
            styles.option,
            state.isSelected && styles.optionSelected,
            state.isFocused && styles.optionFocused,
          ),
      }}
      components={{
        DropdownIndicator: () => (
          <Icon
            className={cn(
              styles.dropdownIndicator,
              isMenuOpen && styles.dropdownIndicatorOpen,
            )}
            name="chevron-down"
            strokeWidth={1}
          />
        ),
        Menu: (props) => (
          <>
            <div
              className={styles.sheetOverlay}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <components.Menu {...props}>
              {/* шапка видна только в мобильной шторке */}
              <div className={styles.sheetHeader}>
                <div className={styles.sheetHandle} />
                <span className={styles.sheetTitle}>Выберите модель</span>
              </div>
              {props.children}
            </components.Menu>
          </>
        ),
      }}
      menuIsOpen={isMenuOpen}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      menuShouldBlockScroll={isMobile}
      // вниз, когда есть место; на низких экранах и в чате сам уедет вверх
      menuPlacement="auto"
      menuPosition="fixed"
      maxMenuHeight={340}
      options={providers.flatMap((provider) => provider.models)}
      // недоступные модели НЕ disabled: клик по ним ведёт в окно входа
      // (обрабатывается в onModelChange), бейджи рисуются ниже по статусу
      formatOptionLabel={(data, { context, selectValue }) => {
        const display = getModelDisplay(data);

        if (context === "value") {
          return (
            <div className="flex gap-3 items-center">
              <div className={styles.providerImage}>
                <Image
                  src={`/icons/providers/${providersById?.[data.id]}.png`}
                  width={16}
                  height={16}
                  alt={`Provider ${providersById?.[data.id]}`}
                />
              </div>
              <span className={styles.modelName}>{display.name}</span>
            </div>
          );
        }

        return (
          <div className={styles.model}>
            <div className={styles.optionProviderImage}>
              <Image
                src={`/icons/providers/${providersById?.[data.id]}.png`}
                width={24}
                height={24}
                alt={`Provider ${providersById?.[data.id]}`}
              />
            </div>
            <div className={styles.optionInfo}>
              <div className={styles.heading}>
                <span className={styles.modelName}>{display.name}</span>
                {isOptionDisabled(profile)(data) &&
                  data.available_for_status.startsWith("subscription") && (
                    <span className={styles.subscription}>Плюс</span>
                  )}
                {isOptionDisabled(profile)(data) &&
                  data.available_for_status === "active" && (
                    <Icon className={styles.lockIcon} name="lock" size={16} />
                  )}
              </div>
              <div className={styles.modelDescription}>
                {display.description}
              </div>
            </div>
            {selectValue.some((item) => item.id === data.id) && (
              <Icon className={styles.checkIcon} name="check" size={20} />
            )}
          </div>
        );
      }}
    />
  );
};

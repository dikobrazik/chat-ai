"use client";

import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import Image from "next/image";
import { useState } from "react";
import Select, { components } from "react-select";
import { getProfile, type Model, type Profile } from "@/api";
import Icon from "@/components/ui/Icon";
import { useIsMobile } from "@/hooks/useMobile";
import styles from "./ModelSelect.module.scss";
import { useModel } from "./useModel";

const USER_STATUSES = [
  "guest",
  "active",
  "subscription_base",
  "subscription_plus",
  "subscription_pro",
];

const isOptionDisabled = (profile?: Profile) => (option: Model) =>
  USER_STATUSES.indexOf(option.available_for_status) >
  (profile?.status ? USER_STATUSES.indexOf(profile?.status) : -1);

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
        groupHeading: () => styles.groupHeading,
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
      menuPlacement="top"
      menuPosition="fixed"
      options={providers.map((provider) => ({
        label: provider.name,
        options: provider.models,
      }))}
      formatGroupLabel={(data) => (
        <div className={styles.groupLabel}>{data.label}</div>
      )}
      isOptionDisabled={isOptionDisabled(profile)}
      formatOptionLabel={(data, { context, selectValue }) => {
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
              <span className={styles.modelName}>{data.name}</span>
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
                <span className={styles.modelName}>{data.name}</span>
                {isOptionDisabled(profile)(data) &&
                  data.available_for_status.startsWith("subscription") && (
                    <span className={styles.subscription}>с подпиской</span>
                  )}
                {isOptionDisabled(profile)(data) &&
                  data.available_for_status === "active" && (
                    <span className={styles.subscription}>после входа</span>
                  )}
              </div>
              <div className={styles.modelDescription}>{data.description}</div>
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

"use client";

import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import Image from "next/image";
import Select from "react-select";
import { getProfile, type Model, type Profile } from "@/api";
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
        dropdownIndicator: () => styles.dropdownIndicator,
        control: () => styles.control,
        groupHeading: () => styles.groupHeading,
        menu: () => styles.menu,
        option: () => styles.option,
      }}
      menuPlacement="top"
      menuPosition="fixed"
      options={providers.map((provider) => ({
        label: provider.name,
        options: provider.models,
      }))}
      formatGroupLabel={(data) => (
        <div className={styles.groupLabel}>
          <Image
            src={`/icons/providers/${data.label}.png`}
            width={20}
            height={20}
            alt={`Provider ${data.label}`}
          />
          <strong>{data.label}</strong>{" "}
        </div>
      )}
      isOptionDisabled={isOptionDisabled(profile)}
      formatOptionLabel={(data, { context, selectValue }) => (
        <div
          className={cn(
            styles.model,
            selectValue.some((item) => item.id === data.id) && styles.selected,
          )}
        >
          <div className={styles.heading}>
            <div className="flex gap-3 items-center">
              {context === "value" && (
                <Image
                  src={`/icons/providers/${providersById?.[data.id]}.png`}
                  width={16}
                  height={16}
                  alt={`Provider ${providersById?.[data.id]}`}
                />
              )}
              <span>{data.name}</span>
            </div>

            {isOptionDisabled(profile)(data) &&
              data.available_for_status.startsWith("subscription") && (
                <span className={styles.subscription}>с подпиской</span>
              )}
            {isOptionDisabled(profile)(data) &&
              data.available_for_status === "active" && (
                <span className={styles.subscription}>после входа</span>
              )}
          </div>
          {context === "menu" && (
            <div className={styles.modelDescription}>{data.description}</div>
          )}
        </div>
      )}
    />
  );
};

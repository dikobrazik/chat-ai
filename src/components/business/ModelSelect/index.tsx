"use client";

import { getProviders, Model } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Select from "react-select";
import styles from "./ModelSelect.module.scss";
import { useModelContext } from "@/providers/ModelProvider/hooks";
import { useEffect } from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

export const ModelSelect = () => {
  const router = useRouter();
  const { model, setModel } = useModelContext();

  const { data: providers } = useQuery({
    queryKey: ["providers"],
    queryFn: getProviders,
    refetchInterval: false,
  });

  useEffect(() => {
    if (providers) {
      const firstProvider = providers[0];
      const firstModel = firstProvider.models[0];

      setModel(firstModel);
    }
  }, [providers]);

  const onModelChange = (selectedOption: Model | null) => {
    if (selectedOption) {
      setModel(selectedOption);
    }

    router.push("/chat");
  };

  if (!providers) return null;

  return (
    <Select<Model>
      isSearchable={false}
      value={model}
      onChange={onModelChange}
      className={styles.select}
      classNames={{
        indicatorSeparator: () => styles.indicatorSeparator,
        indicatorsContainer: () => styles.indicatorsContainer,
        dropdownIndicator: () => styles.dropdownIndicator,
        control: () => styles.control,
        groupHeading: () => styles.groupHeading,
        menu: () => styles.menu,
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
      formatOptionLabel={(data, { context, selectValue }) => (
        <div
          className={cn(
            styles.model,
            selectValue.some((item) => item.id === data.id) && styles.selected,
          )}
        >
          <div>{data.name}</div>
          {context === "menu" && (
            <div className={styles.modelDescription}>{data.description}</div>
          )}
        </div>
      )}
    />
  );
};

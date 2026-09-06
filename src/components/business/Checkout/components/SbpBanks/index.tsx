"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useSbpBanksList } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { cn } from "@/lib/utils";
import { SBP_BANKS_PREVIEW_COUNT } from "../../constants";
import styles from "./SbpBanks.module.scss";

type Props = {
  selectedBankId?: string;
  onBankSelect: (bankId: string) => void;
};

export const SbpBanks = ({ selectedBankId, onBankSelect }: Props) => {
  const { data: banks = [], isLoading } = useSbpBanksList();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const listRef = useRef<HTMLFieldSetElement>(null);

  const foundBanks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return banks;

    return banks.filter((bank) => bank.BankName.toLowerCase().includes(query));
  }, [banks, search]);

  // весь список — почти две сотни строк, поэтому по умолчанию показываем
  // самые популярные (бэк присылает их отсортированными по BankOrder)
  const isCollapsed = !search && !isExpanded;
  const visibleBanks = isCollapsed
    ? foundBanks.slice(0, SBP_BANKS_PREVIEW_COUNT)
    : foundBanks;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 pt-2">
        {Array.from({ length: 4 }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Skeleton key={index} isLoading height={48} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className={styles.search}>
        <TextField
          fullWidth
          type="search"
          label="Выберите банк, чтобы продолжить"
          placeholder="Сбербанк"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
      </div>

      <div aria-live="polite">
        {!visibleBanks.length && (
          <Text style="regular" type="s" color="#6F6F6F">
            Такой банк не найден. Проверьте название или оплатите картой
          </Text>
        )}
      </div>

      <fieldset ref={listRef} tabIndex={-1} className={styles.list}>
        <legend className="sr-only">Банк для оплаты по СБП</legend>
        {visibleBanks.map((bank) => (
          <button
            key={bank.BankId}
            type="button"
            aria-pressed={bank.BankId === selectedBankId}
            className={cn(styles.bank, {
              [styles.selected]: bank.BankId === selectedBankId,
            })}
            onClick={() => onBankSelect(bank.BankId)}
          >
            <Image
              className={styles.logo}
              width={32}
              height={32}
              src={bank.BankLogo}
              alt=""
            />
            <Text as="span" style="regular" type="s">
              {bank.BankName}
            </Text>
            {bank.BankId === selectedBankId && (
              <Icon name="check" size={16} className={styles.check} />
            )}
          </button>
        ))}
      </fieldset>

      {isCollapsed && foundBanks.length > SBP_BANKS_PREVIEW_COUNT && (
        <Button
          align="center"
          rightIcon={<Icon name="chevron-down" size={16} />}
          // кнопка исчезает после клика, поэтому фокус уводим в сам список,
          // иначе он улетает в body
          onClick={() => {
            setIsExpanded(true);
            listRef.current?.focus();
          }}
        >
          <Text type="s" style="regular">
            Показать все банки
          </Text>
        </Button>
      )}
    </div>
  );
};

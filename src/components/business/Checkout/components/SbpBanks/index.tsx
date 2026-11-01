"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { cn } from "@/lib/utils";
import styles from "./SbpBanks.module.scss";
import { useBankSelect } from "./useBankSelect";

type Props = {
  tariff: string;
  sixMonths: boolean;
};

export const SbpBanks = (props: Props) => {
  const {
    banks,
    search,
    selectedBankId,
    isLoading,
    isError,
    isPaying,
    onSearchChange,
    onBankSelect,
    onRetry,
    onPay,
  } = useBankSelect(props);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <Text style="regular" type="s" color="#6F6F6F">
          Не удалось загрузить список банков
        </Text>
        <Button variant="base" size="m" onClick={onRetry}>
          <Text type="s" style="regular">
            Обновить
          </Text>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TextField
        value={search}
        placeholder="Название банка"
        leftIcon={<Icon className="text-[#9C9C9C]" name="search" />}
        onValueChange={onSearchChange}
        fullWidth
        size="l"
      />

      <div role="radiogroup" aria-label="Банк" className={styles.list}>
        {isLoading &&
          Array.from({ length: 6 }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton key={index} isLoading height={56} width="100%" />
          ))}

        {!isLoading && !banks.length && (
          <Text style="regular" type="s" color="#6F6F6F">
            Банк не найден
          </Text>
        )}

        {banks.map((bank) => (
          <label
            key={bank.BankId}
            className={cn(styles.bank, {
              [styles.selected]: bank.BankId === selectedBankId,
            })}
          >
            <input
              type="radio"
              name="sbp-bank"
              className="sr-only"
              value={bank.BankId}
              checked={bank.BankId === selectedBankId}
              onChange={() => onBankSelect(bank.BankId)}
            />
            <Image
              src={bank.BankLogo}
              alt=""
              width={40}
              height={40}
              className={styles.logo}
            />
            <Text type="m" style="regular">
              {bank.BankName}
            </Text>
            {bank.BankId === selectedBankId && (
              <Icon name="check" className={styles.check} />
            )}
          </label>
        ))}
      </div>

      <div className="flex flex-col gap-3 text-center">
        <Button
          variant="primary"
          size="m"
          align="center"
          fullWidth
          disabled={!selectedBankId}
          loading={isPaying}
          onClick={onPay}
        >
          <Text type="s" style="regular">
            Оплатить в приложении
          </Text>
        </Button>
        <Text style="regular" type="s" color="#6F6F6F">
          После оплаты вернитесь в браузер — страница обновится сама
        </Text>
      </div>
    </div>
  );
};

import { useState } from "react";
import { toast } from "react-toastify/unstyled";
import { getSbpLink, type TariffInfoPayload, useSbpBanks } from "@/api";
import { getMobileOs } from "@/utils/mobile-os";
import { filterBanks } from "./utils";

export const useBankSelect = (tariffInfo: TariffInfoPayload) => {
  const [search, setSearch] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<string>();
  const [isPaying, setIsPaying] = useState(false);

  const { data = [], isPending, isError, refetch } = useSbpBanks(getMobileOs());

  const onPay = async () => {
    if (!selectedBankId) {
      return;
    }

    setIsPaying(true);

    try {
      const { link } = await getSbpLink({
        ...tariffInfo,
        bankId: selectedBankId,
      });

      window.location.href = link;
    } catch {
      toast.error(
        "Не удалось открыть приложение банка. Попробуйте ещё раз или напишите в поддержку",
      );
    }

    setIsPaying(false);
  };

  return {
    banks: filterBanks(data, search),
    search,
    selectedBankId,
    isLoading: isPending,
    isError,
    isPaying,
    onSearchChange: setSearch,
    onBankSelect: setSelectedBankId,
    onRetry: () => refetch(),
    onPay,
  };
};

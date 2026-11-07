import { useState } from "react";
import {
  type TariffInfoPayload,
  useProfile,
  useSbpBanks,
  useSbpLink,
} from "@/api";
import { getMobileOs } from "@/utils/mobile-os";
import { getVisibleBanks } from "./utils";

export const useBankSelect = (tariffInfo: TariffInfoPayload) => {
  const [search, setSearch] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<string>();

  const { data: profile } = useProfile();
  const { data = [], isPending, isError, refetch } = useSbpBanks(getMobileOs());

  const banks = getVisibleBanks(data, search);
  const selectedBank = banks.find((bank) => bank.BankId === selectedBankId);

  const link = useSbpLink(tariffInfo, selectedBank?.BankId, profile?.id);

  return {
    banks,
    search,
    selectedBankId: selectedBank?.BankId,
    link: link.data?.link,
    isLoading: isPending,
    isError,
    isLinkLoading: link.isFetching,
    isLinkError: link.isError,
    onSearchChange: setSearch,
    onBankSelect: setSelectedBankId,
    onRetry: () => refetch(),
    onLinkRetry: () => link.refetch(),
  };
};

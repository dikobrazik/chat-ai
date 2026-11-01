import type { SbpBank } from "@/api";

export const filterBanks = (banks: SbpBank[], search: string) => {
  const query = search.trim().toLowerCase();

  return banks
    .filter((bank) => bank.BankName.toLowerCase().includes(query))
    .sort((a, b) => a.BankOrder - b.BankOrder);
};

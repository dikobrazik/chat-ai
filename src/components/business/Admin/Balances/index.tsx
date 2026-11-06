"use client";

import { useProviderBalances } from "@/api";
import { Skeleton } from "@/components/ui/Skeleton";
import { AdminError } from "../components/AdminError";
import { UpdatedAt } from "../components/UpdatedAt";
import { BalanceCard } from "./components/BalanceCard";

export const AdminBalances = () => {
  const { data, error, isLoading, refetch } = useProviderBalances();

  if (error) {
    return <AdminError error={error} onRetry={() => refetch()} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <UpdatedAt date={data?.updated_at} />
      <Skeleton isLoading={isLoading} width="100%" height={280}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.balances.map((balance) => (
            <BalanceCard key={balance.provider} balance={balance} />
          ))}
        </div>
      </Skeleton>
    </div>
  );
};

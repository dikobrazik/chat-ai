"use client";

import { getSubscription } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function SubsriptionPage() {
  const { data } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscription,
  });

  return <div>{JSON.stringify(data)}</div>;
}

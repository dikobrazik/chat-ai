"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchChatsAndPrompts } from "@/api";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { TextField } from "@/components/ui/TextField";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

const QUERY_PARAM_KEY = "query";

export default function SearchPage() {
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get(QUERY_PARAM_KEY) ?? "");
  const debouncedSearch = useDebouncedValue(search, 300);
  const router = useRouter();
  const { data, isLoading } = useSearchChatsAndPrompts(debouncedSearch);

  useEffect(() => {
    router.replace(`/search?query=${encodeURIComponent(debouncedSearch)}`);
  }, [router.replace, debouncedSearch]);

  const onResetSearch = () => {
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <TextField
          className="flex-1"
          value={search}
          leftIcon={<Icon className="text-[#9C9C9C]" name="search" />}
          placeholder="Поиск"
          onValueChange={setSearch}
          fullWidth
          size="l"
        />
        <Button
          className="w-[54px] h-[54px]"
          align="center"
          variant="base"
          onClick={onResetSearch}
          leftIcon={<Icon name="close" />}
        />
      </div>

      <div className="flex flex-col gap-2">
        {data?.map((item) => (
          <Skeleton
            key={item.id}
            width="100%"
            height={40}
            isLoading={isLoading}
          >
            <Button
              key={item.id}
              align="left"
              href={{
                pathname: `/chat/${item.chatId}`,
                query: { promptId: encodeURIComponent(item.id) },
              }}
            >
              <span
                className="text-xs text-gray-500 text-left"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                dangerouslySetInnerHTML={{ __html: item.preview }}
              />
            </Button>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}

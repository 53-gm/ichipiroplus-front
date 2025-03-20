"use client";

import { Box, Option, Select } from "@yamada-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SortControlProps {
  defaultSortBy?: string;
}

const SortControl = ({ defaultSortBy = "newest" }: SortControlProps) => {
  const [sortValue, setSortValue] = useState("newest");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSortValue(defaultSortBy);
  }, [defaultSortBy]);

  const handleSortChange = (value: string) => {
    setSortValue(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box>
      <Select value={sortValue} onChange={handleSortChange} width="150px">
        <Option value="newest">新しい順</Option>
        <Option value="oldest">古い順</Option>
        <Option value="updated">更新順</Option>
        <Option value="title">タイトル順</Option>
      </Select>
    </Box>
  );
};

export default SortControl;

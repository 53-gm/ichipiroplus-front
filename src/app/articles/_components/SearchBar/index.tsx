"use client";

import { SearchIcon } from "@yamada-ui/lucide";
import { Box, Input, InputGroup, InputLeftElement } from "@yamada-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchBarProps {
  defaultQuery?: string;
}

const SearchBar = ({ defaultQuery = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchQuery(defaultQuery);
  }, [defaultQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("q", searchQuery.trim());
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box w={{ base: "full", md: "auto" }}>
      <form onSubmit={handleSearch}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="記事を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderRadius="md"
            width={{ base: "full", md: "300px" }}
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchBar;

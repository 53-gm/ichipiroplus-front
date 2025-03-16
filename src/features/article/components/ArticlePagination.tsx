"use client";

import { Pagination } from "@yamada-ui/react";

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
}

const ArticlePagination = ({
  currentPage,
  totalPages,
}: ArticlePaginationProps) => {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    return `/articles?${params.toString()}`;
  };

  return (
    <Pagination
      page={currentPage}
      total={totalPages}
      onChange={(page) => {
        window.location.href = createPageUrl(page);
      }}
      colorScheme="primary"
      variant="outline"
      size="md"
    />
  );
};

export default ArticlePagination;

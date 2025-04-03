"use server";

import { fetchApi } from "@/lib/api/client";
import type { Term } from "../types";

export const getNowTermAndYear = () => {
  return fetchApi<{ term: Term; year: number }>(
    "/api/v1/academics/now/",
    {
      method: "GET",
      next: { revalidate: 60 * 60 * 24 },
    },
    false,
  );
};

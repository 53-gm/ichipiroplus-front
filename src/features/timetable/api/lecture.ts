"use server";

import { fetchApi } from "@/lib/api/client";
import { revalidateTag } from "next/cache";
import { Lecture, LectureFormData } from "../types";

/**
 * 全ての講義を取得（フィルタリング可能）
 */
export const getLectures = (params?: Record<string, string | number>) => {
  let endpoint = "/api/v1/academics/lectures/";

  if (params) {
    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }

  return fetchApi<Lecture[]>(endpoint, {
    method: "GET",
  });
};

/**
 * 特定の講義を取得
 */
export const getLectureById = (lectureId: string) => {
  return fetchApi<Lecture>(`/api/v1/academics/lectures/${lectureId}/`, {
    method: "GET",
    next: { tags: [`lecture-${lectureId}`], revalidate: 24 * 60 * 60 },
  });
};

/**
 * 特定の時間帯と学期の講義を取得
 */
export const getLecturesByTimeAndTerm = (
  day: number,
  time: number,
  term: number
) => {
  return fetchApi<Lecture[]>(
    `/api/v1/academics/lectures/?day=${day}&time=${time}&terms=${term}`,
    { method: "GET" }
  );
};

/**
 * 新しい講義を作成
 */
export const createLecture = async (data: LectureFormData) => {
  const response = await fetchApi<Lecture>("/api/v1/academics/lectures/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  revalidateTag("lectures");

  return response;
};

/**
 * 講義の内容を更新
 */
export const updateLecture = async (
  lectureId: string,
  data: Partial<LectureFormData>
) => {
  const response = await fetchApi<Lecture>(
    `/api/v1/academics/lectures/${lectureId}/`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  revalidateTag(`lecture-${response.id}`);
  revalidateTag(`lectures`);
  revalidateTag(`registrations`);

  return response;
};

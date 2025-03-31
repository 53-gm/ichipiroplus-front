"use server";

import { fetchApi } from "@/lib/api/client";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { Lecture, LectureFormData, Registration, Term } from "../types";

export const getNowTermAndYear = () => {
  return fetchApi<{ term: Term; year: number }>(
    "/api/v1/academics/now/",
    {
      method: "GET",
      next: { revalidate: 60 * 60 * 24 },
    },
    false
  );
};
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

/**
 * 登録済み講義を取得
 */
export const getRegistrations = async (year: number, term: number) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  return fetchApi<Registration[]>(
    `/api/v1/academics/registrations/?year=${year}&number=${term}`,
    {
      method: "GET",
      next: {
        tags: ["registrations", `registrations-${user.profile.profile_id}`],
        revalidate: 60 * 60 * 24,
      },
    }
  );
};

// 特定のスケジュールの講義を取得
export const getRegistrationBySchedule = async (
  year: number,
  term: number,
  schedule: number
) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  return fetchApi<Registration[]>(
    `/api/v1/academics/registrations/?year=${year}&number=${term}&schedules=${schedule}`,
    {
      method: "GET",
      next: {
        tags: ["registrations", `registrations-${user.profile.profile_id}`],
        revalidate: 60 * 60 * 24,
      },
    }
  );
};

export const getRegistrationById = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  return fetchApi<Registration>(`/api/v1/academics/registrations/${id}/`, {
    method: "GET",
    next: {
      tags: ["registrations", `registrations-${user.profile.profile_id}`],
      revalidate: 60 * 60 * 24,
    },
  });
};

/**
 * 講義を登録
 */
export const registerLecture = async (lectureId: string, year: number) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const resposne = await fetchApi<Registration>(
    "/api/v1/academics/registrations/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lecture_id: lectureId, year }),
    }
  );

  revalidateTag(`registrations-${user.profile.profile_id}`);

  return resposne;
};

/**
 * 講義登録を削除
 */
export const deleteRegistration = async (registrationId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const resposne = await fetchApi<void>(
    `/api/v1/academics/registrations/${registrationId}/`,
    {
      method: "DELETE",
    }
  );

  revalidateTag(`registrations-${user.profile.profile_id}`);

  return resposne;
};

"use server";

import { fetchApi } from "@/lib/api/client";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import type { Registration } from "../types";

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
    },
  );
};

// 特定のスケジュールの講義を取得
export const getRegistrationBySchedule = async (
  year: number,
  term: number,
  schedule: number,
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
    },
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
    },
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
    },
  );

  revalidateTag(`registrations-${user.profile.profile_id}`);

  return resposne;
};

"use server";

import { fetchApi } from "@/lib/api/client";
import { unstable_update } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { Department, Faculty, ProfileFormData, UserProfile } from "../types";

/**
 * プロフィールIDからユーザープロフィールを取得
 */
export const getUserProfile = (profileId: string) => {
  return fetchApi<UserProfile>(
    `/api/v1/users/profiles/${profileId}/`,
    {
      method: "GET",
      next: { tags: [`profile-${profileId}`], revalidate: 24 * 60 * 60 },
    },
    false
  );
};

export const deleteAccount = async () => {
  await fetchApi<void>(`/api/v1/auth/delete-account/`, {
    method: "DELETE",
  });
};

/**
 * プロフィールを更新
 */
export const updateUserProfile = async (data: ProfileFormData) => {
  const updatedProfile = await fetchApi<UserProfile>(
    "/api/v1/users/me/profile/",
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  await unstable_update({ user: { profile: updatedProfile } });

  revalidateTag(`profile-${updatedProfile.profile_id}`);
  revalidateTag(`articles-by-user-${updatedProfile.profile_id}`);
  revalidateTag("articles");

  return updatedProfile;
};

/**
 * 全ての学部を取得
 * キャッシュは24時間
 */
export const getAllFaculties = () => {
  return fetchApi<Faculty[]>(
    "/api/v1/users/faculties/",
    { method: "GET", next: { revalidate: 24 * 60 * 60 } },
    false
  );
};

/**
 * 全ての学科を取得
 * キャッシュは24時間
 */
export const getAllDepartments = () => {
  return fetchApi<Department[]>(
    "/api/v1/users/departments/",
    { method: "GET", next: { revalidate: 24 * 60 * 60 } },
    false
  );
};

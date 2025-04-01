"use server";

import { fetchApi } from "@/lib/api/client";
import { auth } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import type { Task, TaskFormData } from "../types";

/**
 * 全てのタスクを取得
 */
export const getAllTasks = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  return fetchApi<Task[]>("/api/v1/tasks/tasks/", {
    method: "GET",
    next: { tags: [`tasks-${user.profile.profile_id}`], revalidate: 60 * 60 },
  });
};

/**
 * 特定の講義に関連するタスクを取得
 */
export const getTasksByRegistrationId = async (registrationId: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  return fetchApi<Task[]>(
    `/api/v1/tasks/tasks/?registration_id=${registrationId}`,
    {
      method: "GET",
      next: { tags: [`tasks-${user.profile.profile_id}`], revalidate: 60 * 60 },
    },
  );
};

/**
 * 新しいタスクを作成
 */
export const createTask = async (data: TaskFormData) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const response = fetchApi<Task>("/api/v1/tasks/tasks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  revalidateTag(`tasks-${user.profile.profile_id}`);

  return response;
};

// タスクの更新
export const updateTask = async (
  taskId: string,
  data: Partial<TaskFormData>,
) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const response = fetchApi<Task>(`/api/v1/tasks/tasks/${taskId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  revalidateTag(`tasks-${user.profile.profile_id}`);

  return response;
};

/**
 * タスクの削除
 */
export const deleteTask = async (id: string) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }
  const response = fetchApi<void>(`/api/v1/tasks/tasks/${id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag(`tasks-${user.profile.profile_id}`);

  return response;
};

/* eslint-disable */

import { auth } from "@/lib/auth";

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * バックエンドAPIとの通信を行う基本関数
 */
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth = true
): Promise<T> {
  const baseUrl = process.env.BACKEND_URL || "";
  const url = `${baseUrl}${endpoint}`;

  try {
    const headers: HeadersInit = {
      ...((options.headers as Record<string, string>) || {}),
    };

    if (requireAuth) {
      const session = await auth();
      if (!session?.user?.accessToken) {
        throw new ApiError(401, "認証が必要です。再度ログインしてください。");
      }
      headers["Authorization"] = `Bearer ${session.user.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    let data: unknown;
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
      throw new ApiError(response.status, "レスポンスの解析に失敗しました");
    }

    if (!response.ok) {
      const errorMessage =
        (data as any)?.error?.message ||
        response.statusText ||
        "リクエストに失敗しました";
      throw new ApiError(response.status, errorMessage);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      error instanceof Error ? error.message : "不明なエラーが発生しました"
    );
  }
}

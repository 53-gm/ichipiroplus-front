"use server";

import { fetchApi } from "@/lib/api/client";
import type {
  NotificationSettingsUpdateRequest,
  PushSubscriptionInfo,
  PushSubscriptionRequest,
  PushSubscriptionResponse,
  TestNotificationRequest,
  TestNotificationResponse,
} from "../types";

/**
 * サーバーに通知サブスクリプションを登録する
 */
export async function registerPushSubscription(
  subscription: PushSubscriptionRequest,
): Promise<PushSubscriptionResponse> {
  return fetchApi<PushSubscriptionResponse>("/api/v1/push/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}

/**
 * 通知設定を取得する
 */
export async function getNotificationSettings(): Promise<
  PushSubscriptionInfo[]
> {
  return fetchApi<PushSubscriptionInfo[]>("/api/v1/push/register/", {
    method: "GET",
  });
}

/**
 * 通知設定を更新する
 */
export async function updateNotificationSettings(
  request: NotificationSettingsUpdateRequest,
): Promise<{ success: boolean; subscription: PushSubscriptionInfo }> {
  return fetchApi<{ success: boolean; subscription: PushSubscriptionInfo }>(
    "/api/v1/push/settings/",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );
}

/**
 * サーバーからの通知サブスクリプションを解除する
 */
export async function unregisterPushSubscription(
  endpoint: string,
): Promise<{ success: boolean; deleted: boolean }> {
  return fetchApi<{ success: boolean; deleted: boolean }>(
    "/api/v1/push/unregister/",
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint }),
    },
  );
}

/**
 * テスト通知を送信
 */
export async function sendTestNotification(
  request: TestNotificationRequest,
): Promise<TestNotificationResponse> {
  return fetchApi<TestNotificationResponse>("/api/v1/push/test/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

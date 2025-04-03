"use client";

import { useNotice } from "@yamada-ui/react";
import { useEffect, useState } from "react";
import {
  getNotificationSettings,
  registerPushSubscription,
  sendTestNotification,
  unregisterPushSubscription,
  updateNotificationSettings,
} from "../api";
import type { NotificationSettings, SubscriptionState } from "../types";
import {
  formatSubscriptionForApi,
  getOrCreatePushSubscription,
  requestNotificationPermission,
  showLocalNotificationViaServiceWorker,
  unsubscribeFromBrowser,
} from "../utils";

/**
 * 通知設定を管理するためのカスタムフック
 */
export function useNotification() {
  // 状態管理
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>(
    {
      isSubscribed: false,
      settings: null,
    },
  );

  // 通知表示用
  const notice = useNotice();

  // 初期化: ブラウザのサポート状況と現在の設定を確認
  useEffect(() => {
    async function initialize() {
      try {
        // ブラウザのサポート状況をチェック
        const supported =
          "Notification" in window &&
          "serviceWorker" in navigator &&
          "PushManager" in window;

        setIsSupported(supported);

        if (!supported) {
          setIsLoading(false);
          return;
        }

        // 現在の許可状態を取得
        setPermission(Notification.permission);

        // 現在のサブスクリプション状態を取得
        await checkSubscriptionState();
      } catch (error) {
        console.error("通知初期化エラー:", error);
      } finally {
        setIsLoading(false);
      }
    }

    initialize();
  }, []);

  /**
   * 現在のサブスクリプション状態を確認する
   */
  const checkSubscriptionState = async () => {
    try {
      // ブラウザ側のサブスクリプションを取得
      const browserSubscription = await getOrCreatePushSubscription();

      if (!browserSubscription) {
        setSubscriptionState({
          isSubscribed: false,
          settings: null,
        });
        return;
      }

      setSubscription(browserSubscription);

      // サーバー側のサブスクリプション設定を取得
      const serverSubscriptions = await getNotificationSettings();

      // 現在のエンドポイントに一致するサブスクリプションを検索
      const matchingSubscription = serverSubscriptions.find(
        sub => sub.endpoint === browserSubscription.endpoint,
      );

      if (!matchingSubscription) {
        setSubscriptionState({
          isSubscribed: false,
          settings: null,
        });
        return;
      }

      // サブスクリプションが存在する場合は設定を返す
      setSubscriptionState({
        isSubscribed: true,
        settings: {
          taskReminders: matchingSubscription.task_reminders,
          newArticles: matchingSubscription.new_articles,
          systemNotices: matchingSubscription.system_notices,
        },
      });
    } catch (error) {
      console.error("サブスクリプション状態の確認エラー:", error);
      setSubscriptionState({
        isSubscribed: false,
        settings: null,
      });
    }
  };

  /**
   * 通知の有効/無効を切り替える
   */
  const toggleNotifications = async (
    settings?: NotificationSettings,
  ): Promise<boolean> => {
    if (!isSupported || isProcessing) return false;

    setIsProcessing(true);

    try {
      if (!subscriptionState.isSubscribed) {
        console.log("test");
        // 通知を有効化

        // 1. 許可をリクエスト
        const permissionResult = await requestNotificationPermission();
        setPermission(permissionResult);

        if (permissionResult !== "granted") {
          return false;
        }

        // 2. サブスクリプションを取得/作成
        const newSubscription = await getOrCreatePushSubscription();
        if (!newSubscription) {
          throw new Error("サブスクリプションの作成に失敗しました");
        }

        // 3. サーバーに登録
        const subscriptionData = formatSubscriptionForApi(
          newSubscription,
          settings,
        );
        const response = await registerPushSubscription(subscriptionData);

        // 4. 状態を更新
        setSubscription(newSubscription);
        setSubscriptionState({
          isSubscribed: true,
          settings: {
            taskReminders: response.subscription.task_reminders,
            newArticles: response.subscription.new_articles,
            systemNotices: response.subscription.system_notices,
          },
        });

        notice({
          title: "通知設定",
          description: "プッシュ通知が有効になりました",
          status: "success",
        });

        return true;
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // 通知を無効化
        if (!subscription) {
          return false;
        }

        // 1. サーバーから登録解除
        const response = await unregisterPushSubscription(
          subscription.endpoint,
        );

        if (!response.success) {
          throw new Error("サーバーからのサブスクリプション削除に失敗しました");
        }

        // 2. ブラウザから登録解除
        await unsubscribeFromBrowser(subscription);

        // 3. 状態を更新
        setSubscription(null);
        setSubscriptionState({
          isSubscribed: false,
          settings: null,
        });

        notice({
          title: "通知設定",
          description: "プッシュ通知を無効にしました",
          status: "info",
        });

        return true;
      }
    } catch (error) {
      console.error("通知設定の変更に失敗しました:", error);
      notice({
        title: "エラー",
        description:
          error instanceof Error
            ? error.message
            : "通知設定の変更に失敗しました",
        status: "error",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 通知設定を更新する
   */
  const updateSettings = async (
    newSettings: Partial<NotificationSettings>,
  ): Promise<boolean> => {
    if (
      !isSupported ||
      !subscription ||
      !subscriptionState.isSubscribed ||
      isProcessing
    ) {
      return false;
    }

    setIsProcessing(true);

    try {
      // 1. サーバーに設定を更新
      const response = await updateNotificationSettings({
        endpoint: subscription.endpoint,
        task_reminders: newSettings.taskReminders,
        new_articles: newSettings.newArticles,
        system_notices: newSettings.systemNotices,
      });

      // 2. 状態を更新
      if (response.success) {
        setSubscriptionState({
          isSubscribed: true,
          settings: {
            taskReminders: response.subscription.task_reminders,
            newArticles: response.subscription.new_articles,
            systemNotices: response.subscription.system_notices,
          },
        });

        notice({
          title: "通知設定",
          description: "通知設定を更新しました",
          status: "success",
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error("通知設定の更新に失敗しました:", error);
      notice({
        title: "エラー",
        description:
          error instanceof Error
            ? error.message
            : "通知設定の更新に失敗しました",
        status: "error",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * テスト通知を送信する
   */
  const sendTestNotifications = async (
    title: string,
    body: string,
  ): Promise<boolean> => {
    if (!isSupported || !subscriptionState.isSubscribed || isProcessing) {
      return false;
    }

    setIsProcessing(true);

    try {
      const response = await sendTestNotification({ title, body });

      if (response.success) {
        notice({
          title: "通知テスト",
          description: `テスト通知を送信しました (${response.sent}件)`,
          status: "success",
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error("テスト通知の送信に失敗しました:", error);
      notice({
        title: "エラー",
        description:
          error instanceof Error
            ? error.message
            : "テスト通知の送信に失敗しました",
        status: "error",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * ローカル通知を表示する
   */
  const showLocalNotification = async (
    title: string,
    body: string,
    url?: string,
  ): Promise<boolean> => {
    if (!isSupported || permission !== "granted" || isProcessing) {
      return false;
    }

    setIsProcessing(true);

    try {
      const success = await showLocalNotificationViaServiceWorker(
        title,
        body,
        url,
      );

      if (success) {
        notice({
          title: "通知テスト",
          description: "ローカル通知を表示しました",
          status: "success",
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error("ローカル通知の表示に失敗しました:", error);
      notice({
        title: "エラー",
        description:
          error instanceof Error
            ? error.message
            : "ローカル通知の表示に失敗しました",
        status: "error",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // フックの返り値
  return {
    // 状態
    isSupported,
    isLoading,
    isProcessing,
    permission,
    isSubscribed: subscriptionState.isSubscribed,
    settings: subscriptionState.settings,

    // アクション
    toggleNotifications,
    updateSettings,
    sendTestNotifications,
    showLocalNotification,
  };
}

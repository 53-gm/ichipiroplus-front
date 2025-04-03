console.log("Ichipiro+ カスタムサービスワーカーが読み込まれました!");

// 通知用アイコンパス
const ICON_PATH = "/icon512_rounded.png";
const BADGE_PATH = "/icon512_rounded.png";

// プッシュ通知のハンドラ
self.addEventListener("push", event => {
  console.log("プッシュイベントを受信しました!", event);

  // データがない場合はデフォルト値を使う
  let data;
  try {
    data = event.data
      ? event.data.json()
      : {
          title: "Ichipiro+",
          body: "新しい通知があります",
          url: "/",
        };
  } catch (e) {
    console.error("通知データの解析に失敗しました:", e);
    data = {
      title: "Ichipiro+",
      body: "新しい通知があります",
      url: "/",
    };
  }

  // 通知オプションを設定
  const options = {
    body: data.body,
    icon: ICON_PATH,
    badge: BADGE_PATH,
    data: { url: data.url || "/" },
    vibrate: [200, 100, 200],
    tag: data.tag || `ichipiro-notification-${Date.now()}`,
    actions: data.actions || [],
  };

  // 通知を表示
  console.log("通知を表示します:", data.title, options);

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// 通知クリックのハンドラ
self.addEventListener("notificationclick", event => {
  console.log("通知がクリックされました:", event);

  // 通知を閉じる
  event.notification.close();

  // アクションボタンがクリックされた場合
  if (event.action) {
    console.log("通知アクションがクリックされました:", event.action);

    // アクションに応じた処理
    switch (event.action) {
      case "view_details":
        // 詳細ページへ移動
        event.waitUntil(openUrl(event.notification.data.url));
        break;
      case "dismiss":
        // 何もしない（通知は既に閉じている）
        break;
      default:
        // 未知のアクション - デフォルトのURLに移動
        event.waitUntil(openUrl(event.notification.data.url));
    }
    return;
  }

  // 通知本体がクリックされた場合
  const urlToOpen = event.notification.data?.url
    ? event.notification.data.url
    : "/";

  event.waitUntil(openUrl(urlToOpen));
});

// メッセージイベントハンドラ（テスト用）
self.addEventListener("message", event => {
  console.log("メッセージを受信しました:", event.data);

  // テスト通知用メッセージ
  if (event.data && event.data.type === "SHOW_TEST_NOTIFICATION") {
    const { title, body, url } = event.data;

    self.registration.showNotification(title || "テスト通知", {
      body: body || "これはテスト通知です",
      icon: ICON_PATH,
      badge: BADGE_PATH,
      data: { url: url || "/" },
      vibrate: [200, 100, 200],
    });
  }
});

// URLを開く関数
async function openUrl(url) {
  // 既存のウィンドウがあるか確認
  const windowClients = await clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  // すでに開いているウィンドウがあれば、そこにフォーカス
  for (const client of windowClients) {
    // URLのベースパスが一致するかチェック（完全一致だとハッシュやクエリパラメータで一致しない）
    if (client.url.includes(url) || url.includes(client.url)) {
      await client.focus();
      // 必要に応じてナビゲート（URLが完全一致しない場合）
      if (client.url !== url) {
        return client.navigate(url);
      }
      return client;
    }
  }

  // 開いているウィンドウがなければ新しく開く
  return clients.openWindow(url);
}

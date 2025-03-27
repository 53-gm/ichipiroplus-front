import Header from "@/components/Header";
import "@/lib/tiptap/styles/tiptap.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Center, VStack } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";
import Footer from "../components/Footer";
import YamadaUIProvider from "../components/YamadaUIProvider";
import "./globals.css";

const ZenKakuGothicNewFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Ichipiro+",
  description:
    "広島市立大学生向けの時間割管理、タスク管理、記事共有ができる学習支援アプリ。いちぴろプラスで大学生活をもっと便利に。",
  keywords:
    "いちぴろ, Ichipiro, 広島市立大学, 時間割管理, 学習支援, 大学生アプリ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ichipiro+",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <body className={ZenKakuGothicNewFont.className}>
        <YamadaUIProvider>
          <Center>
            <VStack maxW="9xl" fontSize={{ base: "md", md: "sm" }}>
              <Header />
              {children}
              <SpeedInsights />
              <Footer />
            </VStack>
          </Center>
        </YamadaUIProvider>
      </body>
    </html>
  );
};

export default RootLayout;

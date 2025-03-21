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
});

export const metadata: Metadata = {
  title: "Ichipiro+",
  description: "大学生活をスマートに管理",
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
            <VStack maxW="9xl" fontSize={{ base: "md", md: "xs" }}>
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

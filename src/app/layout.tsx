import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import "@/lib/tiptap/styles/tiptap.css";
import { Center, HStack, VStack } from "@yamada-ui/react";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { ReactNode } from "react";
import DesktopNav from "../components/DesktopNav";
import Footer from "../components/Footer";
import YamadaUIProvider from "../components/YamadaUIProvider";
import "./globals.css";

const ZenKakuGothicNewFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "500",
  preload: true,
});

export const metadata: Metadata = {
  title: "Ichipiro+",
  description: "",
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

              <HStack w="full" minH="100vh" h="full" alignItems="stretch">
                <DesktopNav />
                <MobileNav />
                <VStack
                  w="full"
                  h="full"
                  gap={{ base: "lg", md: "sm" }}
                  py={{ base: "lg", md: "sm" }}
                  px={{ base: "lg", md: "md" }}
                  alignItems="center"
                  as="main"
                >
                  {children}
                </VStack>
              </HStack>
              <Footer />
            </VStack>
          </Center>
        </YamadaUIProvider>
      </body>
    </html>
  );
};

export default RootLayout;

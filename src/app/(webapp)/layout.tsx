import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import { HStack, VStack } from "@yamada-ui/react";
import { ReactNode } from "react";

const WebappLayout = ({ children }: { children: ReactNode }) => {
  return (
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
  );
};

export default WebappLayout;

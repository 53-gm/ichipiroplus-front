import {
  Box,
  Center,
  HStack,
  Heading,
  Skeleton,
  Spacer,
  Text,
} from "@yamada-ui/react";
import { Suspense } from "react";
import UserMenu from "../features/user/components/UserMenu";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Header = () => {
  return (
    <>
      <Center as="header" w="full" position="sticky" py="md" zIndex={10}>
        <HStack w="full" maxW="9xl" px={{ base: "lg", md: "md" }}>
          <Text>
            <Heading as="span" fontFamily="sans-serif">
              I
            </Heading>
            <Heading as="span">chipiro+</Heading>
          </Text>

          <Spacer />

          <Box display={{ base: "block", md: "none" }}>
            <ThemeToggleButton />
          </Box>
          <Suspense
            fallback={
              <Skeleton borderRadius="full" width="48px" height="48px" />
            }
          >
            <UserMenu />
          </Suspense>
        </HStack>
      </Center>
    </>
  );
};

export default Header;

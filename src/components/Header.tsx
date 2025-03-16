import { auth } from "@/lib/auth";
import { Box, Center, Heading, HStack, Spacer, Text } from "@yamada-ui/react";
import UserMenu from "../features/user/components/UserMenu";
import { ThemeToggleButton } from "./ThemeToggleButton";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

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
          <UserMenu userProfile={user?.profile} />
        </HStack>
      </Center>
    </>
  );
};

export default Header;

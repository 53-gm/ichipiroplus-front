import { auth, signOut } from "@/lib/auth";
import { UserIcon } from "@yamada-ui/lucide";
import {
  Avatar,
  Box,
  Center,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@yamada-ui/react";
import Link from "next/link";

const UserMenu = async () => {
  const session = await auth();
  const userProfile = session?.user?.profile;
  return (
    <>
      <Menu animation="top">
        <MenuButton
          size="lg"
          as={IconButton}
          variant="unstyled"
          icon={
            userProfile ? (
              <Avatar
                name={userProfile.display_name}
                src={userProfile.picture || ""}
                width="48px"
                height="48px"
                borderRadius="full"
                border="2px solid"
                borderColor={["white", "black"]}
              />
            ) : (
              <Center
                w="48px"
                height="48px"
                borderWidth="1px"
                borderRadius="full"
              >
                <UserIcon color="gray.400" fontSize="2xl" />
              </Center>
            )
          }
        />

        <MenuList>
          <MenuGroup label={userProfile?.display_name || "My Account"}>
            <Link href="/settings">
              <MenuItem>設定</MenuItem>
            </Link>
            <Link href="/">
              <MenuItem>サポート</MenuItem>
            </Link>
          </MenuGroup>

          {userProfile ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Box as="button" type="submit" w="full">
                <MenuItem>サインアウト</MenuItem>
              </Box>
            </form>
          ) : (
            <Link href="/auth/login">
              <Box as="button" type="submit" w="full">
                <MenuItem>サインイン</MenuItem>
              </Box>
            </Link>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;

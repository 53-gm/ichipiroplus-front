import { signIn, signOut } from "@/lib/auth";
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
import { UserProfile } from "../types";

interface UserMenuProps {
  userProfile?: UserProfile;
}

const UserMenu = ({ userProfile }: UserMenuProps) => {
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
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Box as="button" type="submit" w="full">
                <MenuItem>サインイン</MenuItem>
              </Box>
            </form>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;

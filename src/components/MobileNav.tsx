"use client";

import {
  CalendarIcon,
  CircleCheckIcon,
  HouseIcon,
  LibraryIcon,
  SettingsIcon,
} from "@yamada-ui/lucide";
import { Box, HStack, Icon, Text, VStack } from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const MobileNav = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "ホーム",
      icon: <HouseIcon />,
      href: "/dashboard",
    },
    {
      label: "時間割",
      icon: <CalendarIcon />,
      href: "/timetable",
    },
    {
      label: "タスク",
      icon: <CircleCheckIcon />,
      href: "/tasks",
    },
    {
      label: "記事",
      icon: <LibraryIcon />,
      href: "/articles",
    },
    {
      label: "設定",
      icon: <SettingsIcon />,
      href: "/settings",
    },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      py={2}
      zIndex={100}
      display={{ base: "none", md: "block" }}
      _dark={{
        bg: "gray.800",
        borderColor: "gray.700",
      }}
    >
      <HStack justify="space-around" px={4}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <VStack
                gap={1}
                align="center"
                color={isActive ? "primary.500" : "gray.500"}
                _dark={{
                  color: isActive ? "primary.300" : "gray.400",
                }}
              >
                <Icon as={() => item.icon} boxSize="24px" />
                <Text fontSize="xs" fontWeight={isActive ? "bold" : "normal"}>
                  {item.label}
                </Text>
              </VStack>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
};

export default MobileNav;

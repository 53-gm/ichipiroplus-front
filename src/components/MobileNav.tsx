"use client";

import {
  CalendarIcon,
  CircleCheckIcon,
  HouseIcon,
  LibraryIcon,
  SettingsIcon,
} from "@yamada-ui/lucide";
import {
  Box,
  type Component,
  HStack,
  Icon,
  type IconProps,
  Text,
  VStack,
} from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: Component<"svg", IconProps>;
  href: string;
}

const MobileNav = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      label: "ホーム",
      icon: HouseIcon,
      href: "/dashboard",
    },
    {
      label: "時間割",
      icon: CalendarIcon,
      href: "/timetable",
    },
    {
      label: "タスク",
      icon: CircleCheckIcon,
      href: "/tasks",
    },
    {
      label: "記事",
      icon: LibraryIcon,
      href: "/articles",
    },
    {
      label: "設定",
      icon: SettingsIcon,
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
      bg={["white", "gray.800"]}
      borderTop="1px solid"
      borderColor={["gray.200", "gray.700"]}
      py="sm"
      zIndex={100}
      display={{ base: "none", md: "block" }}
    >
      <HStack justify="space-around" px="sm" className="pb-safe pb-1">
        {navItems.map(item => {
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
                color={
                  isActive
                    ? ["primary.500", "primary.300"]
                    : ["gray.500", "gray.400"]
                }
              >
                <Icon as={item.icon} fontSize="24px" />
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

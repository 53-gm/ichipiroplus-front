"use client";

import { MoonIcon, SunIcon } from "@yamada-ui/lucide";
import { HStack, Switch, useColorMode } from "@yamada-ui/react";

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack gap={2}>
      <SunIcon size="1.25em" />
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        colorScheme="primary"
      />
      <MoonIcon size="1.25em" />
    </HStack>
  );
};

export default ThemeToggleButton;

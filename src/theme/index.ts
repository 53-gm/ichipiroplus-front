"use client";

import type { ThemeConfig } from "@yamada-ui/react";
import {
  type UIStyle,
  type UsageTheme,
  extendConfig,
  extendTheme,
} from "@yamada-ui/react";

const globalStyle: UIStyle = {
  body: {
    bg: ["#F5F9FA", "#141414"],
    fontColor: ["#141414", "#F5F9FA"],
  },
};

const customTheme: UsageTheme = {
  styles: { globalStyle },
};

const customConfig: ThemeConfig = {
  initialColorMode: "system",
};

export const theme = extendTheme(customTheme)();
export const config = extendConfig(customConfig);

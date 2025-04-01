"use client";
import { config, theme } from "@/theme";
import {
  ColorModeScript,
  ThemeSchemeScript,
  UIProvider,
  colorModeManager,
  themeSchemeManager,
} from "@yamada-ui/react";

const YamadaUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ColorModeScript
        type="cookie"
        initialColorMode={config.initialColorMode}
      />
      <ThemeSchemeScript
        type="cookie"
        initialThemeScheme={config.initialThemeScheme}
      />

      <UIProvider
        colorModeManager={colorModeManager.cookieStorage}
        config={config}
        theme={theme}
        themeSchemeManager={themeSchemeManager.cookieStorage}
      >
        {children}
      </UIProvider>
    </>
  );
};

export default YamadaUIProvider;

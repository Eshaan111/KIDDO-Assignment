import React, { createContext, useContext } from "react";
import { ThemeConfig } from "../types/schema";

const defaultTheme: ThemeConfig = {
  primary: "#FF9933",
  background: "#FFF5E6",
  text: "#222222",
  card: "#FFFFFF",
};

const ThemeContext = createContext<ThemeConfig>(defaultTheme);

type Props = {
  theme: ThemeConfig;
  children: React.ReactNode;
};

export function ThemeProvider({ theme, children }: Props) {
  const safeTheme = {
    ...defaultTheme,
    ...theme,
  };

  return (
    <ThemeContext.Provider value={safeTheme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
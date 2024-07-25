/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useState } from "react";

export interface ThemeContextData {
  theme: "light" | "dark";
  onChangeTheme(): void;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

interface themProp {
  children: ReactNode;
}

export const DarkModeProvider = ({ children }: themProp) => {
  const [theme, setTheme] = useState<ThemeContextData["theme"]>("light");

  const onChangeTheme = () => {
    setTheme((old) => (old === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        onChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useDarkMode(): ThemeContextData {
  const context = useContext(ThemeContext);
  return context;
}

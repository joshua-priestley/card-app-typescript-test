import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { ThemeContextType } from "../@types/context";

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.theme);
  const themeToRemove = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeToRemove);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [themeToRemove, setTheme]);

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>;
};

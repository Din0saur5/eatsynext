"use client";
import { createContext, useEffect, useState } from "react";
import { ThemeType } from "@/app/types";


interface ThemeContextType {
  theme?: string;
  changeTheme?: (nextTheme?: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: any) => {
  const storageCheck = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme")
    }
    else {
      return "light"
    }
  }


  const [theme, setTheme] = useState<string>(
    () => storageCheck() || "light"
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const changeTheme = (event?: any) => {
    const nextTheme: string | null = event.target.value || null;
    if (nextTheme) {
      setTheme(nextTheme);
    } else {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export default function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-lg:bottom-2.5 lg:top-1/3">
      <Button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        type="button"
        variant="ghost"
        className="flex h-10 w-10 p-2 items-center justify-center rounded-md border-gray-800 text-gray-800 outline-none ring-0 ring-gray-200 dark:border-slate-300 dark:text-white cursor-pointer"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  )
}

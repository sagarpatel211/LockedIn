"use client";

import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.sync.get(["theme"], (data) => {
      const storedTheme = data.theme || "dark";
      setTheme(storedTheme);
      setIsDark(storedTheme === "dark");
    });
  }, [setTheme]);

  const handleToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    setIsDark(checked);
    chrome.storage.sync.set({ theme: newTheme });
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="dark-mode" className="flex items-center space-x-2">
        <span>Dark Mode</span>
        <span>{isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</span>
      </Label>
      <Switch id="dark-mode" checked={isDark} onCheckedChange={handleToggle} />
    </div>
  );
};

export default ThemeToggle;

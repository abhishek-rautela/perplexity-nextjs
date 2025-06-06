"use client";

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { isDarkMode, setDarkMode } = useStore();

  useEffect(() => {
    if (theme === 'dark' && !isDarkMode) {
      setDarkMode(true);
    } else if (theme === 'light' && isDarkMode) {
      setDarkMode(false);
    }
  }, [theme, isDarkMode, setDarkMode]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setDarkMode(newTheme === 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </Button>
  );
}
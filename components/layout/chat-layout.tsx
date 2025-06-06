"use client";

import { useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useStore } from '@/lib/store';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  const { showSidebar, isDarkMode, setDarkMode } = useStore();
  
  // Apply system theme preference
  useEffect(() => {
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(darkModePreference);
  }, [setDarkMode]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {showSidebar && (
        <aside className="w-[300px] border-r border-border h-screen hidden md:block">
          <Sidebar />
        </aside>
      )}
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
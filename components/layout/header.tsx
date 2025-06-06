"use client";

import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  SearchIcon, 
  MenuIcon, 
  XIcon, 
  SunIcon, 
  MoonIcon, 
  GlobeIcon,
  BookIcon,
  YoutubeIcon,
  ImageIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { SearchInput } from '@/components/search/search-input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { SearchFilters } from '@/components/search/search-filters';
import { SearchMode } from '@/lib/types';

export function Header() {
  const { 
    showSidebar, 
    toggleSidebar, 
    searchMode, 
    setSearchMode 
  } = useStore();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const router = useRouter();

  const handleSearchModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
  };

  return (
    <header className="h-16 border-b border-border bg-background/60 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {showSidebar ? <XIcon /> : <MenuIcon />}
          </Button>
          
          <Link 
            href="/"
            className="flex items-center space-x-2 font-bold text-primary text-xl"
          >
            <span className="hidden md:inline-block">Perplexity Clone</span>
          </Link>
          
          <nav className="hidden md:flex items-center ml-8 space-x-1">
            <Button
              variant={searchMode === 'web' ? 'default' : 'ghost'}
              size="sm"
              className="text-sm"
              onClick={() => handleSearchModeChange('web')}
            >
              <GlobeIcon className="w-4 h-4 mr-2" />
              Web
            </Button>
            <Button
              variant={searchMode === 'academic' ? 'default' : 'ghost'}
              size="sm"
              className="text-sm"
              onClick={() => handleSearchModeChange('academic')}
            >
              <BookIcon className="w-4 h-4 mr-2" />
              Academic
            </Button>
            <Button
              variant={searchMode === 'youtube' ? 'default' : 'ghost'}
              size="sm"
              className="text-sm"
              onClick={() => handleSearchModeChange('youtube')}
            >
              <YoutubeIcon className="w-4 h-4 mr-2" />
              YouTube
            </Button>
            <Button
              variant={searchMode === 'images' ? 'default' : 'ghost'}
              size="sm"
              className="text-sm"
              onClick={() => handleSearchModeChange('images')}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Images
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2">
          {!showSearchInput ? (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowSearchInput(true)}
              aria-label="Show search"
            >
              <SearchIcon />
            </Button>
          ) : (
            <div className="absolute inset-0 z-20 bg-background/95 backdrop-blur-sm px-4 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearchInput(false)}
                className="mr-2"
                aria-label="Hide search"
              >
                <XIcon />
              </Button>
              <div className="flex-1">
                <SearchInput onSearch={() => setShowSearchInput(false)} />
              </div>
            </div>
          )}
          
          <div className="hidden md:block w-96">
            <SearchInput />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-2">
                <GlobeIcon className="w-4 h-4 mr-1" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <SearchFilters />
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
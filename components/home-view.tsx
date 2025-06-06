"use client";

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { SearchInput } from '@/components/search/search-input';
import { Button } from '@/components/ui/button';
import { GlobeIcon, BookIcon, YoutubeIcon, ImageIcon } from 'lucide-react';
import { SearchMode } from '@/lib/types';

export function HomeView() {
  const router = useRouter();
  const { 
    searchMode, 
    setSearchMode, 
    createNewChat, 
    chats 
  } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize store
    useStore.persist.rehydrate();
  }, []);

  if (!mounted) {
    return null; // Avoid rendering during SSR
  }

  const handleStartChat = () => {
    const chat = createNewChat();
    router.push(`/chat/${chat.id}`);
  };

  const handleSearchModeChange = (mode: SearchMode) => {
    setSearchMode(mode);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter">
              Perplexity AI Clone
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Ask anything and get instant answers powered by AI. We search the web and provide sources.
            </p>
          </div>
          
          <div className="w-full space-y-6">
            <div className="flex justify-center space-x-2">
              <Button
                variant={searchMode === 'web' ? 'default' : 'outline'}
                onClick={() => handleSearchModeChange('web')}
                className="rounded-full"
              >
                <GlobeIcon className="w-4 h-4 mr-2" />
                Web
              </Button>
              <Button
                variant={searchMode === 'academic' ? 'default' : 'outline'}
                onClick={() => handleSearchModeChange('academic')}
                className="rounded-full"
              >
                <BookIcon className="w-4 h-4 mr-2" />
                Academic
              </Button>
              <Button
                variant={searchMode === 'youtube' ? 'default' : 'outline'}
                onClick={() => handleSearchModeChange('youtube')}
                className="rounded-full"
              >
                <YoutubeIcon className="w-4 h-4 mr-2" />
                YouTube
              </Button>
              <Button
                variant={searchMode === 'images' ? 'default' : 'outline'}
                onClick={() => handleSearchModeChange('images')}
                className="rounded-full"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Images
              </Button>
            </div>
            
            <div className="w-full">
              <SearchInput placeholder="Ask anything..." />
            </div>
            
            {chats.length > 0 && (
              <div className="flex justify-center pt-4">
                <Button onClick={handleStartChat}>
                  Start a new chat
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Instant answers</h3>
              <p className="text-sm text-muted-foreground">
                Get immediate responses to your questions with AI-powered answers.
              </p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Cite sources</h3>
              <p className="text-sm text-muted-foreground">
                Every answer comes with sources you can explore for more information.
              </p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Conversation memory</h3>
              <p className="text-sm text-muted-foreground">
                Follow-up on previous questions and have meaningful conversations.
              </p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Multiple search modes</h3>
              <p className="text-sm text-muted-foreground">
                Search across web, academic papers, YouTube, and images.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
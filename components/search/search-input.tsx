"use client";

import { useState, KeyboardEvent } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';

interface SearchInputProps {
  onSearch?: () => void;
  placeholder?: string;
}

export function SearchInput({ onSearch, placeholder = "Ask anything..." }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const { createNewChat, addMessage, setIsProcessing } = useStore();
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    // Create a new chat and add the user message
    const chat = createNewChat();
    addMessage(chat.id, {
      role: 'user',
      content: query,
    });
    
    // Add a pending assistant message
    addMessage(chat.id, {
      role: 'assistant',
      content: '',
      pending: true,
    });
    
    // Set processing state and navigate to the chat
    setIsProcessing(true);
    router.push(`/chat/${chat.id}`);
    
    // Call optional callback
    if (onSearch) onSearch();
    
    // Reset query
    setQuery('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <Input
        type="text"
        placeholder={placeholder}
        className="pr-10 rounded-full border-border focus-visible:ring-primary"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-0 top-0 h-full rounded-l-none rounded-r-full"
        onClick={handleSearch}
        disabled={!query.trim()}
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
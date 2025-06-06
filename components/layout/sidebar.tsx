"use client";

import { useStore } from '@/lib/store';
import { formatDate, truncateText } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const { chats, activeChat, createNewChat, removeChat, clearChats } = useStore();
  const router = useRouter();
  
  const handleNewChat = () => {
    const chat = createNewChat();
    router.push(`/chat/${chat.id}`);
  };
  
  const handleRemoveChat = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeChat(chatId);
  };
  
  const handleClearChats = () => {
    clearChats();
    router.push('/');
  };
  
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border">
        <Button 
          onClick={handleNewChat} 
          className="w-full"
          variant="default"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="py-4 space-y-2">
          {chats.map(chat => (
            <Link 
              key={chat.id} 
              href={`/chat/${chat.id}`}
              className={`
                block p-3 rounded-md text-sm flex justify-between items-center group
                ${activeChat?.id === chat.id 
                  ? 'bg-secondary' 
                  : 'hover:bg-secondary/60'}
              `}
            >
              <div className="flex-1 truncate">
                <div className="font-medium">
                  {truncateText(chat.title, 25)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(new Date(chat.updatedAt))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleRemoveChat(e, chat.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2Icon className="w-4 h-4" />
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
      
      {chats.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button
            onClick={handleClearChats}
            variant="outline"
            className="w-full text-sm"
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Clear All Chats
          </Button>
        </div>
      )}
    </div>
  );
}
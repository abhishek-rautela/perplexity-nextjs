"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { ChatLayout } from '@/components/layout/chat-layout';
import { ChatInterface } from '@/components/chat/chat-interface';
import { ChatPlaceholder } from '@/components/chat/chat-placeholder';

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.id as string;
  const { chats, activeChat, setActiveChat, createNewChat } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize store if needed
    useStore.persist.rehydrate();

    // Find the chat or create a new one if not found
    if (chatId === 'new') {
      createNewChat();
      setLoading(false);
    } else {
      const chat = chats.find(c => c.id === chatId);
      if (chat) {
        setActiveChat(chatId);
      } else {
        createNewChat();
      }
      setLoading(false);
    }
  }, [chatId, chats, setActiveChat, createNewChat]);

  if (loading) {
    return (
      <ChatLayout>
        <div className="h-full w-full flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </ChatLayout>
    );
  }

  return (
    <ChatLayout>
      {activeChat ? (
        <ChatInterface chat={activeChat} />
      ) : (
        <ChatPlaceholder />
      )}
    </ChatLayout>
  );
}
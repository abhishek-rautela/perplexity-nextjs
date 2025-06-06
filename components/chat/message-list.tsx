import { Message } from '@/lib/types';
import { ChatMessage } from '@/components/chat/chat-message';
import { Separator } from '@/components/ui/separator';

interface MessageListProps {
  messages: Message[];
  isStreaming: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center text-muted-foreground">
          <p>No messages yet</p>
          <p className="text-sm">Start a conversation by typing a message below</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {messages.map((message, index) => (
        <div key={message.id}>
          <ChatMessage 
            message={message} 
            isStreaming={isStreaming && index === messages.length - 1 && message.role === 'assistant'}
          />
          {index < messages.length - 1 && <Separator className="my-6" />}
        </div>
      ))}
    </div>
  );
}
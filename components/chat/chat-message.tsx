import { Message } from '@/lib/types';
import ReactMarkdown from 'react-markdown';
import { Avatar } from '@/components/ui/avatar';
import { UserIcon, BotIcon, Loader2 } from 'lucide-react';
import { SourceList } from '@/components/chat/source-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ChatMessageProps {
  message: Message;
  isStreaming: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const [showSources, setShowSources] = useState(false);
  const hasContent = message.content && message.content.trim().length > 0;
  const hasSources = message.sources && message.sources.length > 0;

  const toggleSources = () => {
    setShowSources(!showSources);
  };

  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className="flex space-x-3 max-w-[85%]">
        <Avatar className={message.role === 'user' ? 'bg-primary' : 'bg-secondary'}>
          {message.role === 'user' ? (
            <UserIcon className="h-5 w-5 text-primary-foreground" />
          ) : (
            <BotIcon className="h-5 w-5 text-secondary-foreground" />
          )}
        </Avatar>
        
        <div className="space-y-2 flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-sm">
              {message.role === 'user' ? 'You' : 'AI Assistant'}
            </span>
            
            {message.role === 'assistant' && (
              <Badge variant="outline" className="ml-2 text-xs">
                {message.pending ? 'Thinking...' : 'Completed'}
              </Badge>
            )}
          </div>
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {message.pending && !hasContent ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              <div className={isStreaming ? "streaming-text" : ""}>
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            )}
          </div>
          
          {hasSources && (
            <div className="pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSources}
                className="text-xs px-2 py-1 h-auto"
              >
                {showSources ? 'Hide sources' : 'Show sources'} ({message.sources!.length})
              </Button>
              
              {showSources && (
                <Card className="mt-2 p-3">
                  <SourceList sources={message.sources!} />
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
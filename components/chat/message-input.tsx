"use client";

import { useState, useRef, KeyboardEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Ask a follow-up question...',
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (content.trim() && !disabled) {
      onSendMessage(content);
      setContent('');
      
      // Focus back on textarea after sending
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2 items-end">
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[60px] max-h-[200px] pr-12 resize-none"
          rows={1}
        />
        <Button
          size="icon"
          className={`absolute right-2 bottom-2 h-8 w-8 ${
            !content.trim() || disabled ? 'opacity-50' : 'opacity-100'
          }`}
          onClick={handleSend}
          disabled={!content.trim() || disabled}
        >
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
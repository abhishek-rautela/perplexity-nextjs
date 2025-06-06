"use client";

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { Chat } from '@/lib/types';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { delay } from '@/lib/utils';

interface ChatInterfaceProps {
  chat: Chat;
}

export function ChatInterface({ chat }: ChatInterfaceProps) {
  const { addMessage, updateMessage, setIsProcessing } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(chat.id, {
      role: 'user',
      content,
    });
    
    // Add pending assistant message
    addMessage(chat.id, {
      role: 'assistant',
      content: '',
      pending: true,
    });
    
    // Simulate response streaming for demo
    await simulateResponseStreaming(chat.id);
  };
  
  const simulateResponseStreaming = async (chatId: string) => {
    setIsProcessing(true);
    setIsStreaming(true);
    
    // Find the pending message
    const pendingMessageId = chat.messages[chat.messages.length - 1].id;
    
    // Define example sources
    const sources = [
      {
        id: '1',
        title: 'Understanding AI and Machine Learning',
        url: 'https://example.com/ai-intro',
        snippet: 'AI and machine learning are revolutionizing how we interact with technology...',
        favicon: 'https://example.com/favicon.ico',
        siteName: 'Example Tech Blog'
      },
      {
        id: '2',
        title: 'The Evolution of Artificial Intelligence',
        url: 'https://example.org/ai-evolution',
        snippet: 'From rule-based systems to neural networks, AI has come a long way...',
        favicon: 'https://example.org/favicon.ico',
        siteName: 'AI Research Institute'
      }
    ];
    
    // Generate a response based on the user's last message
    const userMessage = chat.messages[chat.messages.length - 2].content;
    let response = '';
    
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      response = "Hello! I'm your AI assistant. How can I help you today?";
    } else if (userMessage.toLowerCase().includes('weather')) {
      response = "I don't have real-time weather data, but I can tell you that weather forecasts are predictions of weather conditions using atmospheric data, mathematical models, and historical patterns. If you need current weather information, you should check a weather service like weather.gov or AccuWeather.";
    } else if (userMessage.toLowerCase().includes('ai')) {
      response = "Artificial Intelligence (AI) refers to computer systems designed to perform tasks that typically require human intelligence. These include learning, reasoning, problem-solving, perception, and language understanding. Modern AI is dominated by machine learning, particularly deep learning, which uses neural networks to learn patterns from large datasets. AI applications are widespread, from virtual assistants like Siri and Alexa to recommendation systems on platforms like Netflix and Amazon.";
    } else {
      response = `I've found information related to your query about "${userMessage}". AI systems process information by analyzing patterns in data, utilizing algorithms to make predictions or decisions. The field continues to evolve rapidly, with new breakthroughs in natural language processing, computer vision, and reinforcement learning expanding AI capabilities. Researchers and companies are working to develop more sophisticated AI systems while addressing concerns about ethics, privacy, and potential societal impacts.`;
    }
    
    // Simulate streaming by updating the message character by character
    const words = response.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? '' : ' ') + words[i];
      updateMessage(chatId, pendingMessageId, {
        content: currentText,
      });
      
      // Add a small delay to simulate typing
      await delay(i === 0 ? 500 : Math.random() * 150 + 50);
    }
    
    // Update message with final content and sources
    updateMessage(chatId, pendingMessageId, {
      content: response,
      pending: false,
      sources: sources
    });
    
    setIsProcessing(false);
    setIsStreaming(false);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto">
          <MessageList messages={chat.messages} isStreaming={isStreaming} />
          <div ref={bottomRef} />
        </div>
      </div>
      
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <MessageInput 
            onSendMessage={handleSendMessage} 
            disabled={isStreaming}
          />
        </div>
      </div>
    </div>
  );
}
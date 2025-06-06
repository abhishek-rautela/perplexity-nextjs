import { Inngest } from 'inngest';

// Create a client
export const inngest = new Inngest({ name: 'Perplexity Clone' });

// Define the event types
export type AISearchEvents = {
  'ai.query.submitted': {
    data: {
      chatId: string;
      messageId: string;
      query: string;
      userId?: string;
    };
  };
  'ai.query.completed': {
    data: {
      chatId: string;
      messageId: string;
      query: string;
      processingTimeMs: number;
      sourcesCount: number;
      userId?: string;
    };
  };
};
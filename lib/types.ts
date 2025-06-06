export type SearchMode = 'web' | 'academic' | 'youtube' | 'images';

export interface Source {
  id: string;
  title: string;
  url: string;
  snippet: string;
  favicon?: string;
  siteName?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Source[];
  pending?: boolean;
  error?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  searchMode: SearchMode;
}

export interface SearchFilters {
  timeRange?: 'all' | 'day' | 'week' | 'month' | 'year';
  region?: string;
  language?: string;
}
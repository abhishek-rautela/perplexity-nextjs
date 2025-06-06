import { create } from 'zustand';
import { Chat, Message, SearchMode, SearchFilters } from '@/lib/types';
import { persist } from 'zustand/middleware';

interface AppState {
  chats: Chat[];
  activeChat: Chat | null;
  searchMode: SearchMode;
  searchFilters: SearchFilters;
  isDarkMode: boolean;
  isProcessing: boolean;
  showSidebar: boolean;
  
  // Actions
  setSearchMode: (mode: SearchMode) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  setDarkMode: (isDark: boolean) => void;
  toggleSidebar: () => void;
  
  // Chat actions
  createNewChat: () => Chat;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  removeChat: (chatId: string) => void;
  clearChats: () => void;
  
  // Processing state
  setIsProcessing: (isProcessing: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      chats: [],
      activeChat: null,
      searchMode: 'web',
      searchFilters: { timeRange: 'all' },
      isDarkMode: false,
      isProcessing: false,
      showSidebar: true,
      
      setSearchMode: (mode) => set({ searchMode: mode }),
      
      setSearchFilters: (filters) => set({ searchFilters: filters }),
      
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      
      toggleSidebar: () => set((state) => ({ showSidebar: !state.showSidebar })),
      
      createNewChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          searchMode: get().searchMode
        };
        
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChat: newChat
        }));
        
        return newChat;
      },
      
      setActiveChat: (chatId) => {
        const chat = get().chats.find(c => c.id === chatId);
        if (chat) {
          set({ activeChat: chat });
        }
      },
      
      addMessage: (chatId, messageData) => {
        const message: Message = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          ...messageData
        };
        
        set((state) => {
          const updatedChats = state.chats.map(chat => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, message],
                updatedAt: new Date(),
                title: chat.messages.length === 0 && message.role === 'user' 
                  ? truncateTitle(message.content) 
                  : chat.title
              };
            }
            return chat;
          });
          
          const updatedActiveChat = updatedChats.find(c => c.id === chatId) || null;
          
          return {
            chats: updatedChats,
            activeChat: updatedActiveChat
          };
        });
      },
      
      updateMessage: (chatId, messageId, updates) => {
        set((state) => {
          const updatedChats = state.chats.map(chat => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: chat.messages.map(message => 
                  message.id === messageId 
                    ? { ...message, ...updates } 
                    : message
                ),
                updatedAt: new Date()
              };
            }
            return chat;
          });
          
          const updatedActiveChat = state.activeChat?.id === chatId
            ? updatedChats.find(c => c.id === chatId) || null
            : state.activeChat;
          
          return {
            chats: updatedChats,
            activeChat: updatedActiveChat
          };
        });
      },
      
      removeChat: (chatId) => {
        set((state) => {
          const updatedChats = state.chats.filter(chat => chat.id !== chatId);
          const updatedActiveChat = state.activeChat?.id === chatId
            ? updatedChats[0] || null
            : state.activeChat;
          
          return {
            chats: updatedChats,
            activeChat: updatedActiveChat
          };
        });
      },
      
      clearChats: () => {
        set({ chats: [], activeChat: null });
      },
      
      setIsProcessing: (isProcessing) => set({ isProcessing })
    }),
    {
      name: 'perplexity-clone-storage',
      skipHydration: true
    }
  )
);

function truncateTitle(content: string): string {
  return content.length > 30 
    ? content.substring(0, 30) + '...' 
    : content;
}
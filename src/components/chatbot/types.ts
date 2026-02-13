/**
 * Type definitions for AI Chatbot (T018-T019)
 */

/**
 * Chat message interface
 */
export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Chat state interface
 */
export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  conversationId: string | null;
  error: string | null;
}

/**
 * Tool call information (for debugging/transparency)
 */
export interface ToolCallInfo {
  tool: string;
  params: Record<string, unknown>;
  result: unknown;
}

/**
 * Chat API request
 */
export interface ChatRequest {
  conversation_id?: string;
  message: string;
}

/**
 * Chat API response
 */
export interface ChatResponse {
  conversation_id: string;
  response: string;
  tool_calls?: ToolCallInfo[];
}

/**
 * Conversation metadata
 */
export interface Conversation {
  id: string;
  userId: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Chat context value
 */
export interface ChatContextValue {
  state: ChatState;
  sendMessage: (message: string) => Promise<void>;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  clearConversation: () => void;
  loadConversation: (conversationId: string) => Promise<void>;
}

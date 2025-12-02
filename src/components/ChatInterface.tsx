import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { generateResponse } from '../services/geminiService';
import type { ChatMessage } from '../types';

const STORAGE_KEY = 'chat_history';

const getWelcomeMessage = (): ChatMessage => ({
  id: 'welcome',
  role: 'model',
  text: "Hello! I'm Dat's AI Assistant. Ask me anything about his full-stack experience, his work with AWS, or his specific projects.",
  timestamp: new Date()
});

// Load messages from localStorage
const loadMessages = (): ChatMessage[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      return parsed.map((msg: ChatMessage) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
  return [getWelcomeMessage()];
};

// Save messages to localStorage
const saveMessages = (messages: ChatMessage[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export interface ChatInterfaceRef {
  sendMessage: (message: string) => void;
}

export const ChatInterface = forwardRef<ChatInterfaceRef>((_, ref) => {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save messages whenever they change
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear chat history
  const clearHistory = () => {
    const welcomeMsg = getWelcomeMessage();
    setMessages([welcomeMsg]);
  };

  const sendMessageInternal = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    // Store current messages before adding new one for history
    const currentMessages = [...messages, userMsg];

    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Pass conversation history (excluding the current message which is already in prompt)
      const responseText = await generateResponse(userMsg.text, useThinking, messages);

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        isThinking: useThinking,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat error", error);
    } finally {
      setIsLoading(false);
      // Refocus the input after sending
      inputRef.current?.focus();
    }
  };

  // Expose sendMessage method to parent component
  useImperativeHandle(ref, () => ({
    sendMessage: (message: string) => {
      sendMessageInternal(message);
    }
  }));

  const handleSend = async () => {
    sendMessageInternal(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
      // Immediately refocus the input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-slate-800 p-3 sm:p-4 border-b border-slate-700 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <h3 className="text-sm sm:text-lg font-semibold text-white font-mono truncate">Dat_AI_Terminal</h3>
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
           {/* Clear History Button */}
           <button
             onClick={clearHistory}
             className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
             title="Clear chat history"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
             </svg>
             <span className="hidden sm:inline">Clear</span>
           </button>

           {/* Deep Reasoning Toggle */}
           <div className="flex items-center space-x-2">
             <span className={`text-xs ${useThinking ? 'text-purple-400' : 'text-slate-400'} font-mono hidden sm:inline`}>
               {useThinking ? 'Deep Reasoning' : 'Standard'}
             </span>
             <button
               onClick={() => setUseThinking(!useThinking)}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 ${useThinking ? 'bg-purple-600' : 'bg-slate-600'}`}
               title={useThinking ? 'Deep Reasoning ON' : 'Standard Mode'}
             >
               <span
                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${useThinking ? 'translate-x-6' : 'translate-x-1'}`}
               />
             </button>
           </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              {msg.isThinking && msg.role === 'model' && (
                 <div className="mb-2 text-xs text-purple-400 font-mono border-b border-slate-600 pb-1">
                    <span className="mr-1">⚡</span> Deep Reasoning with Gemini 2.5 Pro
                 </div>
              )}
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {msg.text}
              </div>
              <div className="mt-1 text-[10px] opacity-50 text-right">
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                {useThinking && <span className="text-xs text-purple-400 ml-2 font-mono animate-pulse">Thinking deeply...</span>}
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => !isLoading && setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={isLoading ? "Waiting for response..." : (useThinking ? "Ask a complex engineering question..." : "Type a message...")}
            className={`flex-1 bg-slate-900 text-white border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            readOnly={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

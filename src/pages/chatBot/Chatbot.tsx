import { useState, useEffect, useRef } from "react";
import { MessageSquare, RotateCcw } from "lucide-react";
import TypingIndicator from "../../components/chatBot/TypingIndicator";
import ChatMessage from "../../components/chatBot/ChatMessage";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "../../context/Themecontext";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_RESPONSES = [
  "Hello! I'm your AI assistant. How can I help you today?",
  "That's an interesting question! Let me think about that...",
  "I understand what you're asking. Here's what I think:",
  "Great point! I'd be happy to help you with that.",
  "Thanks for sharing that with me. Let me provide some insights:",
  "I see what you're getting at. Here's my perspective:",
  "That's a thoughtful question. Based on what you've told me:",
  "I appreciate you asking! Here's what I'd suggest:",
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newMessageId, setNewMessageId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  

   const themeContext = useTheme();
  
 

  const {  toggleTheme } = themeContext;


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    setNewMessageId(userMessage.id);
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate typing
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    setIsTyping(false);

    // Add AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
      isUser: false,
      timestamp: new Date(),
    };
    setNewMessageId(aiResponse.id);
    setMessages(prev => [...prev, aiResponse]);
    setTimeout(() => setNewMessageId(null), 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
    setNewMessageId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  

  return (
    <div className="flex flex-col h-screen bg-gray-50  dark:bg-black ">
      {/* Header */}
      

      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm p-4 dark:border-border dark:bg-gradient-chat  ">
  <div className="flex items-center justify-between max-w-4xl mx-auto">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-600  dark:bg-gradient-primary rounded-lg">
        <MessageSquare className="h-5 w-5 text-white " />
      </div>
      <div>
        <h1 className="text-lg font-semibold dark:text-white">AI Assistant</h1>
        <p className="text-sm text-gray-500 dark:text-white">Always here to help</p>
      </div>
    </div>
    
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  </div>
</div>

      {/* Messages */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto    dark:bg-message-primay">
        <div className="max-w-4xl mx-auto py-4 ">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isAnimating={message.id === newMessageId}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 dark:border-border dark:bg-gradient-chat">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200  dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 dark:bg-gradient-primary dark:hover:dark:bg-gradient-primary"
          >
            <span className="text-sm">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
import { useState, useEffect, useRef } from "react";
import { MessageSquare, RotateCcw } from "lucide-react";
import { Bot, User } from "lucide-react";

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

  // Avatar component
  const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center justify-center rounded-full h-8 w-8 overflow-hidden ${className}`}>
      {children}
    </div>
  );

  // Message component
  const Message = ({ message, isUser, timestamp, isAnimating }: {
    message: string;
    isUser: boolean;
    timestamp: Date;
    isAnimating?: boolean;
  }) => (
    <div className={`flex gap-3 p-4 ${isUser ? "justify-end" : "justify-start"} ${isAnimating ? "animate-fade-in" : ""}`}>
      {!isUser && (
        <Avatar className="border border-gray-200 bg-blue-100">
          {/* <span className="text-blue-600 text-sm">AI</span> */}
           <Bot className="h-4 w-4" />
        </Avatar>
      )}
      
      <div className={`flex flex-col gap-1 max-w-[80%] ${isUser ? "items-end" : ""}`}>
        <div className={`px-4 py-3 rounded-2xl ${isUser ? "bg-blue-600 text-white" : "bg-gray-100 border border-gray-200"}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-gray-500 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="border border-gray-200 bg-blue-600">
          {/* <span className="text-white text-sm">You</span> */}
            <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex gap-3 p-4">
      <Avatar className="border border-gray-200 bg-blue-100">
        <span className="text-blue-600 text-sm">AI</span>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200 w-16">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-500 px-2">typing...</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">AI Assistant</h1>
              <p className="text-sm text-gray-500">Always here to help</p>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-4">
          {messages.map((message) => (
            <Message
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
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            />
          </div>
          
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            <span className="text-sm">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
 import Avatar from "../ui/Avatar";
 import { Bot ,User } from "lucide-react";

 const ChatMessage = ({ message, isUser, timestamp, isAnimating }: {
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
      
      <div className={`flex flex-col gap-1 max-w-[80%]  ${isUser ? "items-end" : ""}`}>
        <div className={`px-4 py-3 rounded-2xl ${isUser ? "bg-gray-100  " : "bg-gray-100  border border-gray-200"}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap ">{message}</p>
        </div>
        <span className="text-xs text-gray-500 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="border border-gray-200  bg-blue-100">
          {/* <span className="text-white text-sm">You</span> */}
            <User className="h-4 w-4" />
        </Avatar>
      )}
    </div>
  );

  export default ChatMessage
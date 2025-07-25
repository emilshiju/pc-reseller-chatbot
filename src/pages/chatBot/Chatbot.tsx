import { useState, useEffect, useRef } from "react";
import { MessageSquare, } from "lucide-react";
import TypingIndicator from "../../components/chatBot/TypingIndicator";
import ChatMessage from "../../components/chatBot/ChatMessage";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import { fetchMatchingRecords, getAllDataApi } from "../../services/api/chatBot/chatbotHandler";
import type { MessageType } from "../../types/chatbotTypes";
import toast from 'react-hot-toast';


const AI_RESPONSES = [
    "Get all PC resellers from Chile",
  "Show me PC resellers in Chile",
  "List computer resellers from Chile",
  "Can you fetch PC suppliers in Chile?",
  "I want a list of PC distributors in Chile",
  "Give me all authorized PC resellers from Chile",
  "Find all PC vendors in Chile",
  "Who are the top computer resellers in Chile?",
  "Display PC reseller data from Chile",
  "Get me a list of PC companies in Chile",
  "Fetch Chile PC sellers list",
  "Show computer hardware distributors in Chile",
  "Find PC sellers operating in Chile",
  "Provide a list of PC dealers in Chile",
  "Give me resellers from Chile related to computers"
];

const Chatbot = () => {

  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      data: 'Hi , how can I help you ?',
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

  
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    setMessages(prev => [
  ...prev,
  {
    id: Date.now().toString(),  
    data: inputValue,           
    isUser: true,
    timestamp: new Date()
  }
])


 console.log('first')


 const isAIResponse = AI_RESPONSES.some(response =>
  inputValue.toLowerCase().includes(response.toLowerCase())
);

try {
  console.log("second");
  const response = isAIResponse ? await getAllDataApi() : await fetchMatchingRecords(inputValue);
  console.log(response)
  
  if (response.success&&response.status) {

    console.log(response.data);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        data: response.data,
        isUser: false,
        timestamp: new Date()
      }
    ]);
  }


  if(response.success&&response.status==false){
    toast.error(response.message)
  }

  if(response.success==false){
    toast.error(response.message)
  }

  setInputValue('')
} catch (error) {
  toast.error("try again later")
}





}


  

  return (
    <div className="flex flex-col h-screen bg-gray-50  dark:bg-black ">
      {/* Header */}
      

      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm p-4 dark:border-border dark:bg-charcoal  ">
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
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto    dark:bg-charcoal">
        <div className="max-w-4xl mx-auto py-4 ">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.data}
              isUser={message.isUser}
              timestamp={message.timestamp}
              isAnimating={message.id === newMessageId}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 dark:border-border dark:bg-charcoal">
        <form  className="flex gap-3 items-end max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200  dark:border-border  dark:bg-charcoal dark:text-white  focus:outline-none focus:ring-0"
            />
          </div>
          
          <button
            type="submit"
            onClick={handleSubmit}
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
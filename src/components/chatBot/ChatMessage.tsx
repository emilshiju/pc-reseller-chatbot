 import type { dataType } from "../../types/chatbotTypes";

 type ChatMessageProps = {
  message: string | dataType[];
  isUser: boolean;
  timestamp: Date;
  isAnimating?: boolean;
};


 const ChatMessage = ({ message, isUser, timestamp, isAnimating }: ChatMessageProps) => (
    <div className={`flex gap-3 p-4 ${isUser ? "justify-end" : "justify-start"} ${isAnimating ? "animate-fade-in" : ""}`}>
    

   

   {typeof message === "string" ? (
  
   <div className="p-4 rounded-xl border border-gray-200 dark:border-border bg-white dark:bg-charcoal mb-2">
    <p className="text-md leading-relaxed whitespace-pre-wrap dark:text-white">
      {message}
    </p>
  </div>
) :
  <div className="flex flex-col gap-1 ">
  {message.map((data: dataType, index: number) => (
    <div 
      key={data._id || index}
      className="p-4 rounded-lg border border-gray-200 dark:border-border bg-white dark:bg-charcoal mb-2"
    >
      <h3 className="text-lg font-medium dark:text-white">{data.name}</h3>
      
      <p className="mt-2 text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
        {data.content}
      </p>
      
      {data.url && (
        <div className="mt-3">
          <a 
            href={data.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Visit website →
          </a>
        </div>
      )}
    </div>
  ))}
</div>
}


        
          {/* <p className="text-md leading-relaxed whitespace-pre-wrap  dark:text-white">{message}</p> */}
        
    </div>
  );

  export default ChatMessage
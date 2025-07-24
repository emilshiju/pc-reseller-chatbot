
import Avatar from "../ui/Avatar";

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
  export default TypingIndicator
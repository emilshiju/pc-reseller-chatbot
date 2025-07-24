

const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex items-center justify-center rounded-full h-8 w-8 overflow-hidden ${className}`}>
      {children}
    </div>
  );

  export default Avatar
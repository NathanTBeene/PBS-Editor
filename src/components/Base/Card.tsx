import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({
  children,
  className,
  onClick,
}: CardProps & { onClick?: () => void }) => {
  return (
    <div
      className={`max-w-500 max-h-800 p-4 bg-slate-900 rounded-lg ${className}
        shadow-lg hover:bg-slate-600 cursor-pointer transition-all duration-200
        `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

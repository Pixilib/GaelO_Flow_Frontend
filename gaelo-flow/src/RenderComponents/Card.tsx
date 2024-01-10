
import React from "react";

type CardsProps = {
  color: 'white';
  className?: string;
  bordered?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}

const Card = ({ color, bordered = false, className = '', children, ...props }: CardsProps) => {

  const colorClass = color === 'white' ? 'bg-amber-500 hover:enabled:bg-indigo-700' : '';

  return (
    <div className={`flex flex-1 gap-20 ${colorClass}`}>
      <div className={`w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col ${className}`}>
        <h3 className="text-xl font-bold mx-8"> Title </h3>
        <div className="flex flex-1 justify-center items-end">{children}</div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <h1>Header Content</h1>
    </div>
  );
};

export { Card, Header };

import React from "react";

type ButtonProps = {
    color : string
    children : React.ReactNode
}

const Button = ({ color, children } : ButtonProps) => {
  const colorMap: { [key: string]: string } = {
    orange: "bg-yellow-500",
    blue: "bg-blue-300",
  };

  return (
    <button
      className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent ${colorMap[color]} text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
    >
       {children}
    </button>
  );
};

export default Button;

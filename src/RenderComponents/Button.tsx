import React from "react";
import { Colors } from "../utils/enums";

export type ButtonProps = {
  color: Colors;
  className?: string;
  bordered?: boolean;
  children: React.ReactNode;
  [key: string]: any;
};

const Button = ({ color, bordered, className, children, ...props }: ButtonProps) => {

  const colorClasses: Record<Colors, string> = {
    [Colors.primary]: "bg-primary :bhoverg-primary-hover",
    [Colors.secondary]: "bg-secondary hover:bg-secondary-hover",
    [Colors.danger]: "bg-danger hover:bg-danger-hover",
    [Colors.success]: "bg-success hover:bg-success-hover",
    [Colors.orange]: "bg-orange hover:bg-orange-hover",
    [Colors.dark]: "",
    [Colors.red]: "",
    [Colors.gray]: "",
    [Colors.light]: ""
  };

  return (
    <button
      className={`flex justify-center items-center ${colorClasses[color]} text-white p-3 font-semibold focus:outline-none focus:shadow-outline disabled:bg-opacity-70 ${bordered ? "border border-white-900" : ""} rounded-full shadow-lg ${className} min-w-0`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

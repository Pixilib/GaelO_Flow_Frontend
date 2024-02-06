import React from "react";
import { Colors } from "../../utils/enums";

export type ButtonProps = {
  color: Colors;
  className?: string;
  bordered?: boolean;
  children: React.ReactNode;
  [key: string]: any;
};

const Button = ({ color, bordered, className, children, ...props }: ButtonProps) => {

  const colorClasses: Record<Colors, string> = {
    [Colors.primary]: "bg-primary",
    [Colors.primaryHover]: "hover:bg-primary-hover",
    [Colors.secondary]: "bg-secondary",
    [Colors.secondaryHover]: "hover:bg-secondary-hover",
    [Colors.danger]: "bg-danger",
    [Colors.dangerHover]: "hover:bg-danger-hover",
    [Colors.success]: "bg-success",
    [Colors.successHover]: "hover:bg-success-hover",
    [Colors.disabled]: "bg-disabled",
    [Colors.orange]: "bg-orange",
    [Colors.orangeHover]: "hover:bg-orange-hover",
    [Colors.dark]: "bg-dark", 
    [Colors.red]: "bg-red", 
    [Colors.gray]: "bg-gray",
    [Colors.light]: "bg-light", 
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

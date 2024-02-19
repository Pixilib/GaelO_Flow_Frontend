import React from "react";
import { Colors } from "../utils/enums";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: Colors;
  className?: string;
  bordered?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  color,
  bordered,
  className = '',
  children,
  ...props
}) => {
  const colorClasses: Record<Colors, string> = {
    [Colors.primary]: "bg-primary hover:bg-primary-active",
    [Colors.secondary]: "bg-secondary hover:bg-secondary-hover",
    [Colors.danger]: "bg-danger hover:bg-danger-hover",
    [Colors.success]: "bg-success hover:bg-success-hover",
    [Colors.disabled]: "bg-disabled",
    [Colors.orange]: "bg-orange hover:bg-orange-hover",
    [Colors.dark]: "bg-dark",
    [Colors.red]: "bg-red",
    [Colors.gray]: "bg-gray",
    [Colors.light]: "bg-light",
  };

  const borderClasses = bordered ? "border border-white" : "";

  return (
    <button
      {...props} 
      className={`flex items-center justify-center ${colorClasses[color]} ${borderClasses} focus:shadow-outline p-3 font-semibold text-white focus:outline-none disabled:bg-opacity-70 rounded-full shadow-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

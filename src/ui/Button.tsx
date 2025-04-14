import React from 'react';
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
  const baseColorClasses: Record<keyof typeof Colors, string> = {
    almond: "bg-almond hover:bg-almond-hover disabled:opacity-75 disabled:cursor-not-allowed",
    primary: "bg-primary hover:bg-primary-active dark:bg-indigo-700 dark:hover:bg-indigo-800 disabled:opacity-75 disabled:cursor-not-allowed",
    secondary: "bg-secondary hover:bg-secondary-hover dark:bg-amber-600 dark:hover:bg-amber-700 disabled:opacity-75 disabled:cursor-not-allowed",
    danger: "bg-danger hover:bg-danger-hover dark:bg-red-600 dark:hover:bg-red-700 disabled:opacity-75 disabled:cursor-not-allowed",
    success: "bg-success hover:bg-success-hover dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-75 disabled:cursor-not-allowed",
    blueCustom: "bg-blue-custom hover:bg-blue-custom-hover dark:bg-blue-600 dark:hover:bg-blue-800 disabled:opacity-75 disabled:cursor-not-allowed",
    warning: "bg-warning hover:bg-warning-hover disabled:opacity-75 disabled:cursor-not-allowed",
    dark: "bg-dark disabled:opacity-75 disabled:cursor-not-allowed",
    gray: "bg-gray disabled:opacity-75 disabled:cursor-not-allowed",
    light: "bg-light disabled:opacity-75 disabled:cursor-not-allowed",
    lightGray: '',
    white: '',
  };

  const borderClasses = bordered ? "border border-white" : "";

  return (
    <button
      {...props}
      className={`cursor-pointer flex items-center justify-center ${baseColorClasses[color]} ${borderClasses} focus:shadow-outline rounded-full p-3 font-semibold text-white shadow-lg focus:outline-hidden ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

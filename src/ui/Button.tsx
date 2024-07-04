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
    almond: "bg-almond hover:bg-almond-hover",
    primary: "bg-primary hover:bg-primary-active",
    secondary: "bg-secondary hover:bg-secondary-hover",
    danger: "bg-danger hover:bg-danger-hover",
    success: "bg-success hover:bg-success-hover",
    disabled: "bg-disabled",
    warning: "bg-warning hover:bg-warning-hover",
    dark: "bg-dark",
    red: "bg-red",
    gray: "bg-gray",
    light: "bg-light",
    grayCustom: ""
  };

  const isDisabled = props.disabled;
  const colorClass = baseColorClasses[color] + (isDisabled ? "" : " transition-colors duration-150 ease-in-out");

  const borderClasses = bordered ? "border border-white" : "";

  return (
    <button
      {...props}
      className={`flex items-center justify-center ${colorClass} ${borderClasses} focus:shadow-outline rounded-full p-3 font-semibold text-white shadow-lg focus:outline-none disabled:bg-opacity-70 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

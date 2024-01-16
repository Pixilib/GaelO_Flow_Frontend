import React from "react";

export type ButtonProps = {
  color: 'primary' | 'secondary'| 'disabled'| 'danger' | 'success';
  className?: string;
  bordered?: boolean;
  children: React.ReactNode;
  [key: string]: any;
};

const Button = ({ color, bordered, className, children, ...props }: ButtonProps) => {

  const colorClasses = {
    'primary': 'bg-primary hover:bg-primary-hover',
    'secondary': 'bg-secondary hover:bg-secondary-hover',
    'disabled': 'bg-disabled ',
    'danger': 'bg-danger hover:bg-danger-hover',
    'success': 'bg-success hover:bg-success-hover',
  };
    
  return (
    <button
    className={`flex justify-center ${colorClasses[color]} text-white p-3 font-semibold inline-flex focus:outline-none focus:shadow-outline disabled:bg-opacity-70 ${bordered ? "border border-white-900" : ""} rounded-full shadow-lg ${className} w-40`}    {...props}
  >
    {children}
  </button>
  );
};

export default Button;


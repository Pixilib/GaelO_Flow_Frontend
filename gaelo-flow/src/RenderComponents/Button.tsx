import React from "react";

export type ButtonProps = {
  color: 'primary' | 'secondary'| 'disabled'| 'negative' | 'success';
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
    'negative': 'bg-negative hover:enabled',
    'success': 'bg-success hover:enabled:',
  };
    
  return (
    <button className={colorClasses[color] + " text-white p-3 font-bold inline-flex focus:outline-none focus:shadow-outline disabled:bg-opacity-70 rounded-full" + (bordered ? "border border-white-900" : "") + " " + className} {...props}>
      {children}
    </button>
  );
};

export default Button;


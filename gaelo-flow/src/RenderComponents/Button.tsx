import React from "react";

type ButtonProps = {
  color: 'purple' | 'orange'
  className?: string,
  bordered?: boolean
  children: React.ReactNode
  [key :string] :any 
}

const Button = ({ color, bordered = false, className = '', children, ...props }: ButtonProps) => {

  const colorClasses = {
    'orange': 'bg-amber-500 hover:enabled:bg-indigo-700',
    'purple': 'bg-indigo-700 ed:bg-indigo-900',
  }

  return (
    <button className={colorClasses[color] + " text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline disabled:bg-opacity-70 " + (bordered ? "border border-white-900" : "") + " " + className} {...props} >
      {children}
    </button>
  );
};

export default Button;

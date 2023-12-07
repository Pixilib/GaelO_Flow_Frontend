import React from "react";

type ButtonProps = {
  color: 'purple' | 'green'
  bordered?: boolean
  children: React.ReactNode
  [key :string] :any 
}

const Button = ({ color, bordered = false, children, ...props }: ButtonProps) => {

  const colorClasses = {
    'green': 'bg-green-500 hover:bg-green-700',
    'purple': 'bg-violet-700 hover:bg-indigo-900'
  }

  return (
    <button className={colorClasses[color] + " text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline disabled:bg-gray-500 " + (bordered ? "border border-white-900" : "")} {...props} >
      {children}
    </button>
  );
};

export default Button;

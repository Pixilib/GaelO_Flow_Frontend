import React from "react";

type ButtonProps = {
  color: 'purple' | 'green'
  bordered?: boolean
  children: React.ReactNode
}

const Button = ({ color, bordered = false, children }: ButtonProps) => {

  const colorClasses = {
    'green': 'bg-green-500 hover:bg-green-700',
    'purple': 'bg-violet-700 hover:bg-indigo-900'
  }

  return (
    <button className={colorClasses[color] + " text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline " + (bordered ? "border border-white-900" : "")}>
      {children}
    </button>
  );
};

export default Button;

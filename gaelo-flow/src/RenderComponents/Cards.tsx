
import React from "react";



type CardsProps = {
    color: 'primary'
    className?: string,
    bordered?: boolean
    children: React.ReactNode
    [key :string] :any 
  }
  


  const Cards = ({ color, bordered = false, className = '', children, ...props }: CardsProps) => {

    const colorClasses = {
      'white': 'bg-amber-500 hover:enabled:bg-indigo-700'
    }


    return (

<div className="flex flex-1 gap-20">

        <div className="w-96 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl text-center flex flex-col">
          <h3 className="text-xl font-bold mx-8"> Title </h3>
          <div className="flex flex-1 justify-center items-end"></div>
          </div>
          </div>

          );
};

export default Cards;

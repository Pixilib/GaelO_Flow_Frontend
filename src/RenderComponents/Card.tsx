import React from "react"
import { Colors } from "../utils/enums";

type CardsProps = {
  color: Colors;
  className?: string;
  children: React.ReactNode;
};

type BasicHeaderProps = {
  title: string;
  className?: string;
};

type BodyProps = {
  children: React.ReactNode;
  className?: string;
};

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ color, className = '', children }: CardsProps) => {

  return (
    <div className={`p-4 ${color} ${className}`}>
      {children}
    </div>
  );
};

const BasicHeader = ({ title, className = '' }: BasicHeaderProps) => {
  return (
    <div className={`bg-white border shadow-sm rounded-t-xl ${className}`}>
        <h2 className="text-lg font-bold text-dark text-center">{title}</h2>
        <div className="flex items-center gap-x-1"> 
    
      </div>
    </div>
  );
}

const Body = ({ children, className = '' }: BodyProps) => {
  return (
    <div className={`bg-CardBodyColor text-black w-full box-border flex-grow leading-relaxed py-3 px-12 ${className}`}>
      {children}
    </div>
  );
};

const Footer = ({ children, className = '' }: FooterProps) => {
  return (
    <div className={`bg-primary text-black w-full box-border flex-grow leading-relaxed py-3 px-3 ${className}`}>
      {children}
    </div>
  );
};

export default Object.assign(Card, {
  BasicHeader,
  Body,
  Footer,
});

import React from 'react';

type CardsProps = {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

type BasicHeaderProps = {
  title: string;
  centerTitle?: boolean; 
  className?: string; 
  children?: React.ReactNode;
};

type BodyProps = {
  children: React.ReactNode;
};

type FooterProps = {
  children?: React.ReactNode;
  className?: string;
};

const Card = ({ bordered, className = "", children }: CardsProps) => {
  const borderClass = bordered ? "border" : "";
  const spacingClass = "mx-4 md:mx-4";

  return (
    <div className={`${spacingClass} shadow-md ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, className = "", children }: BasicHeaderProps) => {
  const shadowClass = "shadow-[0_-2px_4px_rgba(0,0,0,0.1)]";

  return (
    <div className={`bg-white text-black ${shadowClass} rounded-t-xl ${className} flex items-center justify-center text-center`}>
      {title && <h2 className="flex-1 p-4 mx-auto text-lg font-bold">{title}</h2>}
      {children}
    </div>
  );
};

const CardBody = ({ children }: BodyProps) => {
  return (
    <div className="box-border flex-grow px-12 py-3 leading-relaxed text-black bg-gray hover:bg-gray-hover">
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "" }: FooterProps) => {
  return (
    <div className={`bg-gray hover:bg-gray-hover text-black box-border flex-grow leading-relaxed py-3 px-3 ${className} rounded-b-xl`}>
      {children || <div className="flex-grow"></div>}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };
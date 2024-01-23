import React from "react";

import { Colors } from "../utils/enums";

type CardsProps = {
  color: Colors;
  bordered?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type BasicHeaderProps = {
  title: string;
  centerTitle?: boolean;
  color?: Colors | undefined;
  className?: string; 
  children : React.ReactNode;
  [key :string] : any;
};

type BodyProps = {
  children: React.ReactNode;
};

type FooterProps = {
  children: React.ReactNode;
  className?: string;
};

const colorClasses: Record<Colors, string> = {
  [Colors.primary]: "bg-primary ",
  [Colors.secondary]: "bg-secondary",
  [Colors.danger]: "bg-danger",
  [Colors.success]: "bg-success",
  [Colors.primaryHover]: "",
  [Colors.secondaryHover]: "",
  [Colors.dangerHover]: "",
  [Colors.successHover]: "",
  [Colors.orange]: "",
  [Colors.dark]: "",
  [Colors.red]: "",
  [Colors.gray]: "bg-gray hover:bg-gray-hover",
  [Colors.light]: ""
};

const Card = ({ bordered, className = "", children }: CardsProps) => {
  const borderClass = bordered ? "border" : "";

  return (
    <div className={`shadow-md ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};
const CardHeader = ({ title, className = "", children, ...props }: BasicHeaderProps) => {
  return (
    <div className={`bg-white text-white shadow-sm rounded-t-xl ${className} flex items-center text-center`} {...props}>
      {title && <h2 className="flex-1 p-4 mx-auto text-lg font-bold text-dark">{title}</h2>}
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

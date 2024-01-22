import React from "react";
import { Colors } from "../utils/enums";

type CardsProps = {
  color: Colors;
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
};

type BasicHeaderProps = {
  title: string;
  leftIcon?: string;
  rightIcon?: React.ReactNode;
  centerTitle?: boolean;
  color?: Colors;
  className?: string;
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
  [Colors.danger]: "bg-danger r",
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

const getColorClass = (color: Colors): string => {
  return colorClasses[color] || "";
};

const Card: React.FC<CardsProps> = ({ color, bordered, className = "", children }) => {
  const dynamicColorClass = getColorClass(color);
  const borderClass = bordered ? "border" : ""; // Ajoutez une classe de bordure si nécessaire

  return (
    <div className={`shadow-md ${dynamicColorClass} ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, leftIcon, rightIcon, centerTitle = false, color, className = "" }: BasicHeaderProps) => {
  const titleAlignmentClass = centerTitle ? "text-center mx-auto" : "text-left";
  const dynamicColorClass = getColorClass(color);

  return (
    <div className={`bg-white shadow-sm rounded-t-xl ${dynamicColorClass} ${className}`}>
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-x-1">
          {leftIcon && <span className="icon-left">{leftIcon}</span>}
          <h2 className={`text-lg font-bold ${titleAlignmentClass} text-dark`}>{title}</h2>
        </div>
        {rightIcon && <span className="icon-right">{rightIcon}</span>}
      </div>
    </div>
  );
};

const CardBody = ({ children }: BodyProps) => {
  return (
    <div className="box-border flex-grow w-full px-12 py-3 leading-relaxed text-black bg-gray hover:bg-gray-hover">
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "" }: FooterProps) => {
  return (
    <div className={`bg-gray hover:bg-gray-hover text-black w-full box-border flex-grow leading-relaxed py-3 px-3 ${className} rounded-b-xl`}>
      {children}
    </div>
  );
};

export default Card;
export {
  CardHeader,
  CardBody,
  CardFooter
};

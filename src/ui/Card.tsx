import React from 'react';
import { Colors } from "../utils/enums";

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
  color?: Colors;
};

type BodyProps = {
  children: React.ReactNode;
  color?: Colors;
  className?: string;

};

type FooterProps = {
  children?: React.ReactNode;
  className?: string;
  color?: Colors;
};

const colorClasses: Record<keyof typeof Colors, string> = {
  almond: "bg-almond",
  primary: "bg-primary",
  primaryHover: "hover:bg-primary-hover",
  secondary: "bg-secondary",
  secondaryHover: "hover:bg-secondary-hover",
  danger: "bg-danger",
  dangerHover: "hover:bg-danger-hover",
  grayCustom: "bg-gray-custom",
  success: "bg-success",
  successHover: "hover:bg-success-hover",
  disabled: "bg-disabled",
  orange: "bg-orange",
  orangeHover: "hover:bg-orange-hover",
  dark: "bg-dark",
  red: "bg-red",
  gray: "bg-gray",
  light: "bg-light",
};

const getColorClass = (color?: Colors) => color ? colorClasses[color] ?? "" : "";

const Card = ({ bordered, className = "", children }: CardsProps) => {
  const borderClass = bordered ? "border" : "";
  const spacingClass = "mx-4 md:mx-4";

  return (
    <div className={`${spacingClass} shadow-md ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, centerTitle, className = "", children, color }: BasicHeaderProps) => {
  const shadowClass = "shadow-[0_-2px_4px_rgba(0,0,0,0.1)]";
  const headerClass = getColorClass(color);

  return (
    <div className={`${headerClass} text-white ${shadowClass} rounded-t-xl ${className} flex items-center ${centerTitle ? 'justify-center' : ''} text-center`}>
      {title && <h2 className="flex-1 p-4 mx-auto text-lg font-bold">{title}</h2>}
      {children}
    </div>
  );
};

const CardBody = ({ children, color }: BodyProps) => {
  const bodyClass = getColorClass(color);

  return (
    <div className={`${bodyClass} box-border px-12 py-3 leading-relaxed text-black`}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", color }: FooterProps) => {
  const footerClass = getColorClass(color);

  return (
    <div className={`${footerClass} box-border grow px-3 py-3 leading-relaxed text-black ${className} rounded-b-xl`}>
      {children || <div className="grow"></div>}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };

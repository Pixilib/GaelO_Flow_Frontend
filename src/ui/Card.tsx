import React from 'react';
import { Colors } from "../utils/enums";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

type CardHeaderProps = {
  title: string;
  centerTitle?: boolean;
  className?: string;
  children?: React.ReactNode;
  color?: Colors;
};

type CardBodyProps = {
  children: React.ReactNode;
  color?: Colors;
  className?: string;
  roundedTopLeft?: boolean;
  roundedTopRight?: boolean;
  roundedBottomLeft?: boolean;
  roundedBottomRight?: boolean;
};

type CardFooterProps = {
  children?: React.ReactNode;
  className?: string;
  color?: Colors;
};

const colorClasses: Record<Colors, string> = {
  almond: "bg-almond",
  primary: "bg-primary",
  primaryHover: "hover:bg-primary-hover",
  secondary: "bg-secondary",
  secondaryHover: "hover:bg-secondary-hover",
  danger: "bg-danger",
  dangerHover: "hover:bg-danger-hover",
  grayCustom: "bg-grayCustom",
  success: "bg-success",
  successHover: "hover:bg-success-hover",
  disabled: "bg-disabled",
  warning: "bg-warning",
  warningHover: "hover:bg-warning-hover",
  dark: "bg-dark",
  red: "bg-red",
  gray: "bg-gray",
  light: "bg-light",
  white: "bg-white",
};

const getColorClass = (color?: Colors) => color ? colorClasses[color] ?? "" : "";

const Card = ({ bordered, className = "", children }: CardProps) => {
  const borderClass = bordered ? "border" : "";
  const spacingClass = "mx-2 md:mx-10";

  return (
    <div data-gaelo-flow="Card" className={`${spacingClass} shadow-md ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, centerTitle, className = "", children, color }: CardHeaderProps) => {
  const shadowClass = "shadow-[0 2px 4px rgba(0,0,0,0.1)]";
  const headerClass = getColorClass(color);

  return (
    <div data-gaelo-flow="Card-header" className={`${headerClass} text-white ${shadowClass} rounded-t-2xl ${className} flex items-center ${centerTitle ? 'justify-center' : ''} text-center`}>
      {title && <h2 className="flex-1 p-3 mx-auto text-lg font-bold">{title}</h2>}
      {children}
    </div>
  );
};


const CardBody = ({ children, color, className = "", roundedTopLeft, roundedTopRight, roundedBottomLeft, roundedBottomRight }: CardBodyProps) => {
  const bodyClass = getColorClass(color);

  // Build an array of rounded corner classes based on props
  const roundedClasses = [
    roundedTopLeft && "rounded-tl-xl",
    roundedTopRight && "rounded-tr-xl",
    roundedBottomLeft && "rounded-bl-xl",
    roundedBottomRight && "rounded-br-xl",
  ].filter(Boolean).join(" ");

  return (
    <div data-gaelo-flow="Card-Body" className={`${bodyClass} box-border px-12 py-3 leading-relaxed text-black ${className} ${roundedClasses}`}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className = "", color }: CardFooterProps) => {
  const footerClass = getColorClass(color);

  return (
    <div data-gaelo-flow="Card-footer" className={`${footerClass} box-border grow px-3 py-3 leading-relaxed text-black ${className} rounded-b-xl`}>
      {children || <div className="grow"></div>}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };

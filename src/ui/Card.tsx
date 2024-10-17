import React from 'react';
import { Colors } from "../utils/enums";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

type CardHeaderProps = {
  title?: string;
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
  secondary: "bg-secondary",
  danger: "bg-danger",
  success: "bg-success",
  warning: "bg-warning",
  dark: "bg-dark",
  gray: "bg-gray",
  blueCustom: "bg-blue-custom",
  light: "bg-light",
  white: "bg-white",
  [Colors.lightGray]: ''
};

const getColorClass = (color?: Colors) => color ? colorClasses[color] ?? "" : "";

const Card = ({ bordered, className = "", children }: CardProps) => {
  const borderClass = bordered ? "border" : "";

  return (
    <div data-gaelo-flow="Card" className={`shadow-md ${className} ${borderClass} rounded-xl`}>
      {children}
    </div>
  );
};

const CardHeader = ({ title, centerTitle, className = "", children, color }: CardHeaderProps) => {
  const shadowClass = "shadow-[0 2px 4px rgba(0,0,0,0.1)]";
  const headerClass = getColorClass(color);

  return (
    <div data-gaelo-flow="Card-header" className={`${headerClass} w-full min-h-12 text-white ${shadowClass} rounded-t-2xl flex items-center ${centerTitle ? 'justify-center' : ''} ${className}`}>
      {title && <div className="text-lg font-bold">{title}</div>}
      {children}
    </div>
  );
};


const CardBody = ({
  children,
  color,
  className = "",
  roundedTopLeft,
  roundedTopRight,
  roundedBottomLeft,
  roundedBottomRight,
  noPadding, 
}: CardBodyProps & { noPadding?: boolean }) => {
  const bodyClass = getColorClass(color);

  const roundedClasses = [
    roundedTopLeft && "rounded-tl-xl",
    roundedTopRight && "rounded-tr-xl",
    roundedBottomLeft && "rounded-bl-xl",
    roundedBottomRight && "rounded-br-xl",
  ].filter(Boolean).join(" ");

  return (
    <div
      data-gaelo-flow="Card-Body"
      className={`${bodyClass} box-border ${noPadding ? "p-0" : "px-12 py-3"} leading-relaxed text-black ${className} ${roundedClasses}`}
    >
      {children}
    </div>
  );
};


const CardFooter = ({ children, className = "", color }: CardFooterProps) => {
  const footerClass = getColorClass(color);

  return (
    <div data-gaelo-flow="Card-footer" className={`${footerClass} box-border px-3 py-3 leading-relaxed text-black ${className} rounded-b-xl`}>
      {children || <div className="grow"></div>}
    </div>
  );
};

export default Card;
export { CardHeader, CardBody, CardFooter };

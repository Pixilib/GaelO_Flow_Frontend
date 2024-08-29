import React, { useState } from "react";

type AccordionProps = {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultOpen?: boolean;
  variant?: "default" | "primary" | "secondary";
};

const Accordion: React.FC<AccordionProps> = ({
  header,
  children,
  variant = "default",
  defaultOpen = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return {
          container: "border-blue-300 ",
        };
      case "primary":
        return {
          container: `border-light-gray bg-primary text-white`,
        };
      case "default":
      default:
        return {
          container: "border-gray-300 bg-white",
        };
    }
  };


  return (
    <div
      className={`transition-all duration-300 ease-in-out my-2 border rounded-lg shadow-md space-y-2 ${getVariantClasses().container} ${className}`}
    >
      <div onClick={handleToggle}>
        {header}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

type AccordionHeaderProps = {
  children?: React.ReactNode;
  variant?: string
  className? : string
}
const AccordionHeader = ({ children, className="", variant="default" }: AccordionHeaderProps) => {

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "cursor-pointer flex justify-between items-center p-4 bg-secondary text-white"
      case "primary":
        return "cursor-pointer flex justify-between items-center p-4 bg-primary-active text-white"
      case "default":
      default:
        return "cursor-pointer flex justify-between items-center p-4 bg-gray-100"
    };
  }


  return (
    <div className={"rounded-lg shadow-md " + getVariantClasses() + " "+ className} >
      {children}
    </div>
  )

}

export default Accordion;
export { AccordionHeader };

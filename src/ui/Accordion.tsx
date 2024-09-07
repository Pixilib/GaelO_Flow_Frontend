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
          container: `border-light-gray bg-primary`,
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
      className={`transition-all duration-300 ease-in-out p-3 border rounded-lg shadow-md w-full ${getVariantClasses().container} ${className}`}
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
  className?: string
}
const AccordionHeader = ({ children, className = "", variant = "default" }: AccordionHeaderProps) => {

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary text-white"
      case "primary":
        return "bg-primary-active text-white"
      case "default":
      default:
        return "bg-gray-100"
    };
  }


  return (
    <div className={"w-full rounded-lg shadow-md flex justify-between items-center p-4 cursor-pointer mb-2 " + getVariantClasses() + " " + className} >
      {children}
    </div>
  )

}

export default Accordion;
export { AccordionHeader };

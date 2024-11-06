import ChevronUp from "../../assets/chevron-up.svg?react";
import ChevronDown from "../../assets/chevron-down.svg?react";

type ToggleChevronProps = {
  isOpen: boolean;
  className?: string;
  onClick?: () => void;
};

const ToggleChevron = ({ isOpen, className, onClick = () => {} }: ToggleChevronProps) => {
  return (
    <span
      data-gaelo-flow="ToggleChevron"
      className={`transition-colors ${className} ${isOpen ? 'text-primary' : 'text-gray-600'} group-hover:text-white`}
      onClick={onClick}
    >
      {isOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
  );
};

export default ToggleChevron;

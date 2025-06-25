import { ChevronRight, ChevronDown } from "../../assets";

type ToggleChevronProps = {
  isOpen: boolean;
  className?: string;
  onClick?: () => void;
};

const ToggleChevron = ({ isOpen, className, onClick = () => {} }: ToggleChevronProps) => {
  return (
    <span
      data-gaelo-flow="ToggleChevron"
      className={`transition-colors ${className} group-hover:text-white`}
      onClick={onClick}
    >
      {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </span>
  );
};

export default ToggleChevron;

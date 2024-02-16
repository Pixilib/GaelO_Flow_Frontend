import ChevronUp from "../../assets/chevron-up.svg?react";
import ChevronDown from "../../assets/chevron-down.svg?react";

type ToggleChevronProps = {
    isOpen: boolean;
    dropDownOpen: () => void;
    className?: string;
}

const ToggleChevron= ({ isOpen, dropDownOpen, className}:ToggleChevronProps) => (
    <span  data-gaelo-flow="ToogleChevron"  className={`${className}`} onClick={dropDownOpen}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
);

export default ToggleChevron;
import ChevronUp from "../../assets/chevron-up.svg?react";
import ChevronDown from "../../assets/chevron-down.svg?react";

type ToggleChevronProps = {
    isOpen: boolean;
    toggleOpen: () => void;
    className?: string;
}

const ToggleChevron= ({ isOpen, toggleOpen, className }:ToggleChevronProps) => (
    <span data-gaelo-flow="ToogleChevron"  className={`${className}`} onClick={toggleOpen}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
);

export default ToggleChevron;
import ChevronUp from "../assets/chevron-up.svg?react";
import ChevronDown from "../assets/chevron-down.svg?react";

type ToggleChevronProps = {
    isOpen: boolean;
    toggleOpen: () => void;
    className?: string;
    myRef: React.Ref<HTMLElement>;
}

const ToggleChevron= ({ isOpen, toggleOpen, className, myRef}:ToggleChevronProps) => (
    <span ref={myRef} data-gaelo-flow="ToogleChevron"  className={`${className}`} onClick={toggleOpen}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
);

export default ToggleChevron;
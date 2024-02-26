import ChevronUp from "../../assets/chevron-up.svg?react";
import ChevronDown from "../../assets/chevron-down.svg?react";

type ToggleChevronProps = {
    isOpen: boolean;
    className?: string;
    onClick?: () => void;
}

const ToggleChevron= ({ isOpen, className, onClick}:ToggleChevronProps) => {
    return(
    <span  data-gaelo-flow="ToogleChevron"  className={`${className}`} onClick={onClick} >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
    </span>
    )
}

// onClick={onClick} onFocus={handleFocus} onBlur={handleBlur}
export default ToggleChevron;
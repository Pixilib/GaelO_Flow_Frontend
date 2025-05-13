import { FaTimes } from "react-icons/fa";

type CancelProps = {
    className? : string
    [key : string] : any
}
const Cancel = ({className, ...props } : CancelProps) => {

    return (
        <FaTimes
            className={`transition-transform duration-200 hover:transform hover:scale-125 ${className}`}
            {...props}

        />
    );
}

export default Cancel;

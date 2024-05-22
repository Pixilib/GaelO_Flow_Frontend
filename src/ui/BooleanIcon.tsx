import { RxCross2 } from "react-icons/rx"; 
import { BiCheck } from "react-icons/bi"; 

type BooleanIconProps = {
    value: boolean;
    size: string;
}

const BooleanIcon: React.FC<BooleanIconProps> = ({ value, size}) => {
    return value ? 
        <BiCheck color={"green"}  size={size} className="mx-auto"/>:
        <RxCross2 color={"red"}  size={size} className="mx-auto"/>;
        
}

export default BooleanIcon;
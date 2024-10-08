import { Check, Cross } from "../icons";

type BooleanIconProps = {
    value: boolean;
    size: string;
}

const BooleanIcon: React.FC<BooleanIconProps> = ({ value, size}) => {
    return value ? 
        <Check color={"green"}  size={size} className="mx-auto"/>:
        <Cross color={"red"}  size={size} className="mx-auto"/>;       
}

export default BooleanIcon;
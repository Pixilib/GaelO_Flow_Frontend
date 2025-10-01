import { LuDisc3 } from "react-icons/lu";


type CdProps = {
    className?: string
    [key: string]: any
}
const Cd = ({ className, ...props }: CdProps) => {

    return (
        <LuDisc3
            className={`transition-transform duration-200 hover:transform hover:scale-125 ${className}`}
            {...props}

        />
    );
}

export default Cd;

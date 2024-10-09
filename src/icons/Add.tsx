import { FaPlus } from 'react-icons/fa';

type AddProps = {
    className?: string
    [key: string]: any
}
const Add = ({ className = '', ...props }: AddProps) => {

    return (
        <FaPlus
            className={`transition-transform duration-200 hover:transform hover:scale-125 ${className}`}
            aria-label="Add"
            {...props}
        />
    );
}

export default Add;

import { useState, ReactNode } from 'react';

type MenuItemProps = {
    icon?: ReactNode;
    text: string;
    to: string;
    className?: string;
    children?: ReactNode;
};

 //TODO composant à revoir
const MenuItem = ({ icon, text, to, className, children, onClick }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className={`flex items-center p-2 bg-inherit text-white ${className}`}>
            {children && (
                <button onClick={() => setIsOpen(!isOpen)} className="ml-4">
                    {isOpen ? 'Less' : 'More'} {/* mettre des icones SVG*/}
                </button>
            )}
            {isOpen  ? children : null}
        </li>
    );
};

export default MenuItem
import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type MenuItemProps = {
    icon?: ReactNode;
    text: string;
    to: string;
    className?: string;
    children?: ReactNode;
};

export const MenuItem: React.FC<MenuItemProps> = ({ icon, text, to, className, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <Link to={to} className={`flex items-center p-2 bg-inherit text-white ${className}`}>
                {icon}
                <span className="ml-3">{text}</span>
            </Link>
            {children && (
                <button onClick={() => setIsOpen(!isOpen)} className="ml-4">
                    {isOpen ? 'Less' : 'More'} {/* mettre des icones SVG*/}
                </button>
            )}
            {isOpen && children}
        </li>
    );
};
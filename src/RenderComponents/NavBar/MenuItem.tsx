import { useState, ReactNode } from 'react';

type MenuItemProps = {
    icon?: ReactNode;
    text: string;
    className?: string;
    children?: ReactNode;
    isOpen= false;
    onClick?: () => void;
};

//TODO composant à revoir
//TODO state à revoir pour le MenuItem géré par le parent
//TODO ajouter un onClick pour le MenuItem
//TODO ajouter en props un composant child pour le MenuItem (pour les sous menus)

const MenuItem = ({ icon, text, to, className, isOpen ,children }: MenuItemProps) => {

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
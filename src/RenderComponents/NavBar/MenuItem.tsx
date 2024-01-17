import { ReactNode } from 'react';
import Items from './Items';

type MenuItemProps = {
    icon: ReactNode;
    title: string;
    items?: string[];
    className?: string;
    isOpen: boolean;
    onToogle?: () => void;
};

//TODO composant à revoir
//TODO state à revoir pour le MenuItem géré par le parent
//TODO ajouter un onClick pour le MenuItem
//TODO ajouter en props un composant child pour le MenuItem (pour les sous menus)

const MenuItem = ({ icon, title,items, className, isOpen, onToogle }: MenuItemProps) => {

    return (
        <div className={`flex items-center p-2 bg-inherit text-white ${className}`}>
            <span className="mr-2">{icon}</span>
            <span onClick={onToogle}>{title}</span>
            {isOpen && <Items items={items || []} />}
        </div>
    );
};

export default MenuItem
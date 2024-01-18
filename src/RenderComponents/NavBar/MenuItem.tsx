import { ReactNode } from 'react';
import Items from './Items';
import ChevronDown from '../../assets/chevron-down.svg?react';
import ChevronUp from '../../assets/chevron-up.svg?react';


type MenuItemProps = {
    icon?: ReactNode;
    title: string;
    items?: string[];
    className?: string;
    isOpen?: boolean;
    onClick?: () => void;
};

//TODO composant à revoir
//TODO state à revoir pour le MenuItem géré par le parent
//TODO ajouter un onClick pour le MenuItem
//TODO ajouter en props un composant child pour le MenuItem (pour les sous menus)

const MenuItemCollapse = ({ icon, title,items, className, isOpen, onClick }: MenuItemProps) => {

    return (
        <>
        <div className={`flex justify-center p-2 bg-inherit hover:bg-[#0C0B76] text-white ${className}`} onClick={onClick}>
            <span>{icon}</span>
            <span >{title}</span>
            <span className=''>
            {items && items.length > 0 && (isOpen === false ? <ChevronDown/> : <ChevronUp/> ) }
            </span>
        </div>
        <div className='flex justify-center'>
            {isOpen && <Items items={items || []} />}
        </div>
        </>
    );
};
// background: #0C0B76;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
export default MenuItemCollapse
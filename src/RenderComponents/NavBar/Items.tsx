import {VariantKey, VariantItem} from './ItemsVariant';

export type Item = {
  title: string;
  path: string;
  isActive: boolean;
};

export type ItemsProps = {
  items: Item[];
  variant: VariantKey;
  onNavigate: (path: string) => void;
};

const Items = ({ items,variant, onNavigate}: ItemsProps) => {
  return (
    <ul data-gaelo-flow="Items" className={`${variant["classUlElem"]}`}>
      {items.map((item, index) => {
        const activeClasses = (item.isActive?? false)
          ? variant.active
          : variant.inactive;
        // console.log({activeClasses,variant})
        return (
          <li
            key={index}
            className={`${variant["classLiElem"]} ${activeClasses}`}
            onClick={() => onNavigate(item.path)}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};

export default Items;

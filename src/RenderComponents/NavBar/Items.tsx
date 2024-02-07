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
    <ul data-gaelo-flow="Items" className={`rounded-b-xl bg-white`}>
      {items.map((item, index) => {
        const activeClasses = (item.isActive?? false)
          ? variant.active
          : variant.inactive;
        // console.log({activeClasses,variant})
        return (
          <li
            key={index}
            className={`${variant["base"]} ${activeClasses}`}
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

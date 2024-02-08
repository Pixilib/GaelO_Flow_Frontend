import { VariantItem, VariantKey } from './ItemsVariant';

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

const Items = ({ items, variant, onNavigate }: ItemsProps) => {

  const { classLiElem, classUlElem, active, inactive } = VariantItem[variant];
  return (
    <ul data-gaelo-flow="Items" className={`${classUlElem}`}>
      {items.map((item, index) => {
        const activeClasses = item.isActive
          ? active
          : inactive;
        return (
          <li
            key={index}
            className={`${classLiElem} ${activeClasses}`}
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

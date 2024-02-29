
export type ItemStyle = {
  classLiElem: string;
  classUlElem: string;
  active: string;
  inactive: string;
};

export type Item = {
  title: string;
  path: string;
  isActive: boolean;
};

export type ItemsProps = {
  elements: Item[];
  style: ItemStyle;
  onSelect: (item: Item) => void;
  icon?: React.ReactNode;
};

export const Items = (({ elements, style, onSelect, icon}:ItemsProps) => {

  return (
      <ul data-gaelo-flow="items" className={style.classUlElem}>
        {elements.map((item, index) => {
          const activeClasses = item.isActive
          ? style.active
          : style.inactive;
          return (
            <li
            key={index}
            className={`${style.classLiElem} ${activeClasses}`}
            onClick={() => onSelect(item)}
            >
              {icon}
              {item.title}
            </li>
          );
        })}
      </ul>
    )
  }
);

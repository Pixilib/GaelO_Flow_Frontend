
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

const Items = (({ elements, style, onSelect, icon}:ItemsProps) => {
  const handleClick = (event: React.MouseEvent, item: Item) => {
    event.stopPropagation();
    onSelect(item);
  };
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
            onClick={(event) => handleClick(event, item)}
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

export default Items
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
  onNavigate: (path: string) => void;
  icon?: React.ReactNode;
};

export const Items = ({ elements, style, onNavigate,icon}: ItemsProps) => {

  return (
    <>
    <ul data-gaelo-flow="items" className={style.classUlElem}>
      {elements.map((item, index) => {
        const activeClasses = item.isActive
        ? style.active
        : style.inactive;
        return (
          <li
          key={index}
          className={`${style.classLiElem} ${activeClasses}`}
          onClick={() => onNavigate(item.path)}
          >
            {icon}
            {item.title}
          </li>
        );
      })}
    </ul>
    </>
  );
};


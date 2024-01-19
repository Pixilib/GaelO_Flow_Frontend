
export type Item = {
  title: string;
  path: string;
  isActive: boolean;
};

type ItemsProps = {
  items: Item[];
  onNavigate: (path: string) => void;
};

const Items = ({ items, onNavigate }: ItemsProps) => {
  return (
    <ul className="bg-white">
      {items.map((item, index) => {
        const activeClasses = item.isActive
          ? "bg-secondary text-dark"
          : "bg-inherit hover:bg-[#0C0B76] text-dark hover:text-white";

        return (
          <li
            key={index}
            className={`flex flex-col justify-center p-2 text-dark  ${activeClasses} ${index === items.length - 1 ? 'rounded-b-xl' : ''}`}
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

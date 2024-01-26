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
    <ul className="bg-white rounded-b-xl">
      {items.map((item, index) => {
        const activeClasses = item.isActive
          ? "text-dark bg-primary text-white cursor-not-allowed"
          : "bg-inherit hover:bg-primary text-dark hover:text-white cursor-pointer";

        return (
          <li
            key={index}
            className={`flex my-0.5 first:mt-0 justify-start last:rounded-b-xl last:mb-0.5 p-2 pl-12 pe-4 items-center text-dark ${activeClasses} `}
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

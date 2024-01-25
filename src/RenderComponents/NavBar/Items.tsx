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
          ? "text-dark bg-inherit hover:bg-primary hover:text-white underline decoration-primary hover:decoration-white decoration-2"
          : "bg-inherit hover:bg-primary text-dark hover:text-white";

        return (
          <li
            key={index}
            //TODO : verifier le selecteur last
            className={`p-2 flex justify-start pl-12 pe-4 items-center text-dark ${activeClasses} last:rounded-b-xl`}
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

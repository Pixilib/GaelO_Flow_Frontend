import { Items, Item, ItemStyle } from "./Items.tsx";


type SideBarItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
};

const SideBarItems = ({ elements, onNavigate }: SideBarItemsProps) => {
  const sideBarItemsStyle: ItemStyle = {
    classLiElem: "flex my-0.5 first:mt-0 justify-start last:rounded-b-xl last:mb-0.5 p-2 pl-12 pe-4 items-center",
    classUlElem: "rounded-b-xl bg-white",
    active: "bg-primary text-white cursor-not-allowed",
    inactive: "bg-inherit hover:bg-primary text-dark hover:text-white cursor-pointer"
  };
  return (
    <Items elements={elements} onNavigate={onNavigate} style={sideBarItemsStyle} />
  )
};

export default SideBarItems;

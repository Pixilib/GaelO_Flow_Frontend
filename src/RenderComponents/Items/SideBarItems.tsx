import { Items, Item, ItemStyle } from "./Items.tsx";


type SideBarItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
};

const SideBarItems = ({ elements, onNavigate }: SideBarItemsProps) => {
  const sideBarItemsStyle: ItemStyle = {
    classLiElem: "flex my-0.5 first:mt-0 text-sm justify-start py-1 pl-12 pe-4 items-center ",
    classUlElem: "rounded-b-xl bg-primary text-[10px] text-white ",
    active: "bg-primary-active text-10 cursor-not-allowed ",
    inactive: "bg-inherit text-10 hover:text-dark cursor-pointer "
  };
  return (
    <Items elements={elements} onNavigate={onNavigate} style={sideBarItemsStyle} />
  )
};

export default SideBarItems;

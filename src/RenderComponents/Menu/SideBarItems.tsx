import { Items, Item, ItemStyle } from "./Items.tsx";

type SideBarItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
};

const SideBarItems = ({ elements, onNavigate }: SideBarItemsProps) => {
  const sideBarItemsStyle: ItemStyle = {
    classLiElem: "flex my-0.5 first:mt-0.5 text-xs ms-4 me-7 py-3 px-4 items-center rounded-lg hover:bg-primary-hover",
    classUlElem: "text-white border-l border-gray-200 ml-11 my-3 ",
    active: "bg-primary-active text-10 cursor-not-allowed",
    inactive: "text-10 cursor-pointer "
  };
  return (
    <Items elements={elements} onNavigate={onNavigate} style={sideBarItemsStyle} />
  )
};

export default SideBarItems;

import { Items, Item, ItemStyle } from "./Items.tsx";


type BannerItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
};

const SideBarItems = ({ elements, onNavigate }: BannerItemsProps) => {
  const sideBarItemsStyle: ItemStyle = {
    classUlElem:"text-center mt-4 rounded-xl bg-primary shadow-lg px-4 relative z-10",
    classLiElem: "cursor-pointer rounded-xl py-3 text-sm hover:text-lg transition-all duration-200",
    active: "",
    inactive: "",
  };
  return (
    <Items elements={elements} onNavigate={onNavigate} style={sideBarItemsStyle} />
  )
};

export default SideBarItems;

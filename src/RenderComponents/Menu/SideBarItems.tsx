import { Items, Item, ItemStyle } from "./Items.tsx";

type SideBarItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
  myRef: React.Ref<HTMLUListElement>;
};


const SideBarItems = ({ elements, onNavigate, myRef }: SideBarItemsProps) => {
  const sideBarItemsStyle: ItemStyle = {
    classLiElem: "flex my-0.5 first:mt-1 text-sm justify-start mx-6 py-1 pl-8 pe-4 items-center rounded-lg hover:bg-primary-hover",
    classUlElem: "text-10 text-white border-l border-gray-200 ml-6 my-4 ",
    active: "bg-primary-active text-10 cursor-not-allowed ",
    inactive: "text-10 cursor-pointer "
  };
  return (
    <Items ref={myRef} elements={elements} onNavigate={onNavigate} style={sideBarItemsStyle} />
  )
};

export default SideBarItems;

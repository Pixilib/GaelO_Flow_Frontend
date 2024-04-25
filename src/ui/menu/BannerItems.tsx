import Items, { Item, ItemStyle } from "./Items.tsx";


type BannerItemsProps = {
  elements: Item[];
  onSelect: (item:Item) => void;
  className?: string;
  isOpen: boolean;
  setOpenItem: (value: string | null) => void;
};

const BannerItems = ({ elements, onSelect, className, isOpen }: BannerItemsProps) => {

  const bannerItemsStyle: ItemStyle = {
    active: "",
    classUlElem: `text-center mt-4 rounded-xl bg-primary shadow-lg relative z-10 ${className}`,
    classLiElem: "cursor-pointer last:rounded-b-xl first:rounded-t-xl py-3 text-sm hover:bg-primary-light",
    inactive: "",
  };
  return isOpen ? (
    <div>
      <Items elements={elements} onSelect={onSelect} style={bannerItemsStyle} />
    </div>
  ) : null;
};

export default BannerItems;

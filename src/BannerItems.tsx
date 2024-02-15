import { Items, Item, ItemStyle } from "./RenderComponents/Items/Items.tsx";


type BannerItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
};

const BannerItems = ({ elements, onNavigate }: BannerItemsProps) => {
  const bannerItemsStyle: ItemStyle = {
    classUlElem:"text-center mt-4 rounded-xl bg-primary shadow-lg relative z-10 w-full",
    classLiElem: "cursor-pointer last:rounded-b-xl first:rounded-t-xl py-3 text-sm hover:bg-primary-hover",
    active: "",
    inactive: "",
  };
  return (
    <Items elements={elements} onNavigate={onNavigate} style={bannerItemsStyle} />
  )
};

export default BannerItems;

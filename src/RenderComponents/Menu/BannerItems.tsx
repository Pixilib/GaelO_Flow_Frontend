import { Items, Item, ItemStyle } from "./Items.tsx";


type BannerItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
  myRef: React.Ref<HTMLUListElement>;
  className?:string;
};

const BannerItems = ({ elements, onNavigate,className, myRef }: BannerItemsProps) => {
  const bannerItemsStyle: ItemStyle = {
    classUlElem:`text-center mt-4 rounded-xl bg-primary shadow-lg relative z-10 ${className}`,
    classLiElem: "cursor-pointer last:rounded-b-xl first:rounded-t-xl py-3 text-sm hover:bg-primary-hover",
    active: "",
    inactive: "",
  };
  return (
    <Items ref={myRef} elements={elements} onNavigate={onNavigate} style={bannerItemsStyle} />
  )
};

export default BannerItems;

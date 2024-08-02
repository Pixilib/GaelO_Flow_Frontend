import Items from './Items';

type Item = {
  code(code: any): unknown;
  title: string;
  path: string;
  isActive: boolean;
};

type ItemStyle = {
  active: string;
  classUlElem: string;
  classLiElem: string;
  inactive: string;
};

type BannerItemsProps = {
  elements: Item[];
  onSelect: (item: Item) => void;
  className?: string;
  isOpen: boolean;
  setOpenItem: (value: string | null) => void;
};

const BannerItems = ({ elements, onSelect, className, isOpen, setOpenItem }: BannerItemsProps) => {
  const bannerItemsStyle: ItemStyle = {
    active: "",
    classUlElem: `text-center mt-4 rounded-xl bg-primary shadow-lg relative ${className}`,
    classLiElem: "cursor-pointer last:rounded-b-xl first:rounded-t-xl py-3 text-sm hover:bg-primary-light",
    inactive: "",
  };

  return isOpen ? (
    <div>
      <Items
        elements={elements}
        onSelect={(item) => {
          onSelect(item);
          setOpenItem(null);
        }}
        style={bannerItemsStyle}
      />
    </div>
  ) : null;
};

export default BannerItems;

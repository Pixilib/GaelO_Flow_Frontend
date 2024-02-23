import { useEffect, useRef } from "react";
import { Items, Item, ItemStyle } from "./Items.tsx";


type BannerItemsProps = {
  elements: Item[];
  onNavigate: (path: string) => void;
  className?: string;
  isOpen: boolean;
  setOpenItem: (value: string | null) => void;
};

const BannerItems = ({ elements, onNavigate, className, isOpen, setOpenItem }: BannerItemsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus on the container when it is open
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.focus();
    }
  }, [isOpen]);

  const bannerItemsStyle: ItemStyle = {
    active: "",
    classUlElem: `text-center mt-4 rounded-xl bg-primary shadow-lg relative z-10 ${className}`,
    classLiElem: "cursor-pointer last:rounded-b-xl first:rounded-t-xl py-3 text-sm hover:bg-primary-hover",
    inactive: "",
  };
  return isOpen ? (
    <div ref={containerRef} tabIndex={-1} onBlur={() => setOpenItem(null)}  >
      <Items elements={elements} onNavigate={onNavigate} style={bannerItemsStyle} />
    </div>
  ) : null;
};

export default BannerItems;

type ItemStyle = {
  classLiElem: string;
  classUlElem: string;
  active: string;
  inactive: string;
};

/**
 * @name VariantItem
 * @description This is a type that contains the different styles for the diferent type of items
 */
export const VariantItem: Record<string, ItemStyle> = {
  SideBarItems: {
    classUlElem: "rounded-b-xl bg-white",
    classLiElem:
      "flex my-0.5 first:mt-0 justify-start last:rounded-b-xl last:mb-0.5 p-2 pl-12 pe-4 items-center",
    active: "bg-primary text-white cursor-not-allowed",
    inactive:
      "bg-inherit hover:bg-primary text-dark hover:text-white cursor-pointer",
  },
  BannerItems: {
    classUlElem:
      "text-center mt-4 rounded-xl bg-primary shadow-lg px-4 relative z-10",
    classLiElem: "cursor-pointer hover:bg-primary-hover rounded-xl py-3",
    active: "",
    inactive: "",
  },
};

export type VariantKey = keyof typeof VariantItem;

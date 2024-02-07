
type ItemStyle = {
    base:string;
    active: string;
    inactive: string;
}

/**
 * @name VariantItem
 * @description This is a type that contains the different styles for the diferent type of items
 */

export const VariantItem: Record<string, ItemStyle> = {
    SideBarItems:{
        base: "flex my-0.5 first:mt-0 justify-start last:rounded-b-xl last:mb-0.5 p-2 pl-12 pe-4 items-center",
        active: "bg-primary text-white cursor-not-allowed",
        inactive: "bg-inherit hover:bg-primary text-dark hover:text-white cursor-pointer"
    },
    BannerItems:{
        base: "inline-flex items-center w-full",
        active: "bg-primary-hover",
        inactive: "hover:bg-primary-hover"
    },
    }

    
    export type VariantKey = keyof typeof VariantItem;


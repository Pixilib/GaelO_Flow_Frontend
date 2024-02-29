export type BannerDropDownProps = {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  dropDownOpen: () => void;
};

export const BannerDropDown = ({
  children,
  className,
  isOpen,
  dropDownOpen,
}: BannerDropDownProps) => {

const handleClick = () => {
  dropDownOpen();
}

const handleFocus = () => {
  if(isOpen)
  dropDownOpen();
};
const handleBlur = () => {
  setTimeout(() => {
    if (isOpen) {
      dropDownOpen();
    }
  }, 100);
};
  return (
    <>
      <div
        data-gaelo-flow="banner-dropdown"
        className={`mr-9 h-12 items-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
        tabIndex={0}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </div>
    </>
  );
};

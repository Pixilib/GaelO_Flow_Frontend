export type BannerDropDownProps = {
  children: React.ReactNode;
  className?: string;
};

export const BannerDropDown = ({
  children,
  className,
}: BannerDropDownProps) => {
  return (
    <>
      <div
        data-gaelo-flow="banner-dropdown"
        className={`mr-9 h-12 items-center rounded-18 border-transparent bg-primary px-4 py-3 font-semibold text-white ${className}`}
      >
        {children}
      </div>
    </>
  );
};

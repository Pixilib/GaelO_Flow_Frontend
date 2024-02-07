//WIP BannerDropDown component

//TODO: Define the type of Object

export type BannerDropDownProps = {
  name: string;
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
      data-gaelo-flow="BannerDropDown"
      className={`h-12 bg-primary py-3 px-4 mr-9 border-transparent rounded-18 items-center font-semibold text-sm text-white ${className}`}
      >
        {children}
      </div>
    </>
  );
};

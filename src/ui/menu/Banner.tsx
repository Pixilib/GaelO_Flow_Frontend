type BannerProps = {
  title: string;
  leftIcon?: React.ReactNode;
  onLeftIconClick?: () => void;
  language?: string;
  children?: React.ReactNode;
  className?: string;
};

const Banner = ({
  title,
  leftIcon,
  onLeftIconClick,
  children,
  className,
}: BannerProps) => {
  return (
    <div
      data-gaelo-flow="banner"
      className={`p-5 w-full flex rounded-br-20 border-transparent shadow-lg bg-white ${className}`}
    >
      <span className="flex items-center w-full ml-12">
        {leftIcon && (
          <span className="mr-8 cursor-pointer" onClick={onLeftIconClick}>
            {leftIcon}
          </span>
        )}
        <span>
          <h1 className="text-2xl font-medium text-primary">{title}</h1>
        </span>
      </span>
      <span className="flex justify-end w-full mr-12">
        {children}
      </span>

    </div>
  );
};

export default Banner;

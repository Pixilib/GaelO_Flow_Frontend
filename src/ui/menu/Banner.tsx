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
      className={`flex h-24 w-full items-center justify-between rounded-br-20 border-transparent shadow-lg bg-white ${className}`}
    >
      <div className="flex items-center ml-12">
        {leftIcon && (
          <span className="mr-8 cursor-pointer" onClick={onLeftIconClick}>
            {leftIcon}
          </span>
        )}

        <span>
          <h1 className="text-2xl font-medium text-primary">{title}</h1>
        </span>
      </div>
      {children}
    </div>
  );
};

export default Banner;

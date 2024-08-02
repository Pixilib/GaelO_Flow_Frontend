import React from 'react';
import { BiLeftArrowAlt as Arrowlefticon } from 'react-icons/bi';

type BannerProps = {
  title: string;
  onLeftIconClick?: () => void;
  language?: string;
  children?: React.ReactNode;
  className?: string;
};

const Banner = ({
  title,
  onLeftIconClick,
  children,
  className,
}: BannerProps) => {
  return (
    <div
      data-gaelo-flow="banner"
      className={`p-5 w-full flex rounded-br-2xl border-transparent shadow-lg bg-white ${className}`}
    >
      <span className="flex items-center w-full ml-12">
        {onLeftIconClick && (
          <span className="flex items-center mr-4 cursor-pointer text-primary" onClick={onLeftIconClick}>
            <Arrowlefticon className="text-3xl leading-none text-primary" />
          </span>
        )}
        <h1 className="text-2xl font-medium text-primary">{title}</h1>
      </span>
      <span className="flex justify-end w-full mr-12">
        {children}
      </span>
    </div>
  );
};

export default Banner;

import React from 'react';
import { ArrowLeft } from '../../icons';

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
      className={`p-5 w-full flex flex-col md:flex-row items-center justify-between rounded-br-2xl border-transparent shadow-lg bg-white ${className}`}
    >
      <div className="flex items-center w-full md:w-auto">
        {onLeftIconClick && (
          <span
            className="flex items-center mr-4 cursor-pointer text-primary"
            onClick={onLeftIconClick}
          >
            <ArrowLeft className="text-3xl leading-none text-primary" />
          </span>
        )}
        <h1 className="text-xl font-medium md:text-2xl text-primary">{title}</h1>
      </div>
      <div className="flex justify-end w-full mt-4 md:w-auto md:mt-0">
        {children}
      </div>
    </div>
  );
};

export default Banner;

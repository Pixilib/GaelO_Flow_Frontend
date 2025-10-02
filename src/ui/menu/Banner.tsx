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
      className={`p-3 w-full flex flex-col items-center sm:flex-row sm:justify-between rounded-br-2xl border-transparent shadow-lg bg-white dark:bg-neutral-800  ${className}`}
   >
      <div className="flex items-center justify-between w-full sm:w-auto">
        {onLeftIconClick && (
          <span
            className="flex items-center mr-2 cursor-pointer text-primary"
            onClick={onLeftIconClick}
          >
            <ArrowLeft className="text-xl sm:text-2xl text-primary dark:text-white" />
          </span>
        )}
        <h1 className="text-lg font-medium text-center sm:text-left sm:text-xl lg:text-2xl text-primary dark:text-white">
          {title}
        </h1>
      </div>
      <div className="flex justify-end w-full mt-3 sm:w-auto sm:mt-0">
        {children}
      </div>
    </div>
  );
};

export default Banner;

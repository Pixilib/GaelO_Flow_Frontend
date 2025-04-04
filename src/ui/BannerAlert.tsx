import React from 'react';
import { Colors } from '../utils';
import { Info } from '../icons';
import Button from './Button';

export interface BannerProps {
  color?: Colors;
  className?: string;
  children?: React.ReactNode;
  buttonLabel?: string;
  onClickButton?: () => void;
  message?: string;
}

const BannerAlert: React.FC<BannerProps> = ({
  color = Colors.danger,
  className = '',
  children,
  buttonLabel = 'See Errors',
  onClickButton,
  message,
  ...props
}) => {

  const colorClass = getColorClass(color);

  function getColorClass(color: Colors): string {
    switch (color) {
      case Colors.warning:
        return 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800 dark:bg-gray-800';
      case Colors.dark:
        return 'text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800';
      case Colors.danger:
        return 'text-red-800 border-red-800 bg-white dark:text-white dark:border-red-700 dark:bg-neutral-800';
      case Colors.gray:
        return 'text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800';
      case Colors.light:
        return 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-gray-800';
      default:
        return 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800 dark:bg-gray-800';
    }
  }

  return (
    <div
      {...props}
      className={`flex items-center p-4 mb-4 border-t-4 rounded-lg shadow-sm ${colorClass} ${className}`}
      role="alert"
    >
      <Info className="shrink-0 w-5 h-5" />
      <div className="text-lg font-medium g ms-3">
        {children || message}
      </div>
      {onClickButton && (
        <Button
          className="px-4 py-2 ml-auto font-bold text-white focus:outline-hidden focus:shadow-outline"
          onClick={onClickButton} color={Colors.danger}       >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default BannerAlert;

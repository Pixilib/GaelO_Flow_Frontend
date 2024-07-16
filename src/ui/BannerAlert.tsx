import { BsFillInfoCircleFill as InfoIcon } from "react-icons/bs"; 
import React from 'react';
import { Colors } from '../utils/enums';

export interface BannerProps {
  color?: Colors; // Make color optional to default to 'red' if not provided
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

const BannerAlert: React.FC<BannerProps> = ({
  color = Colors.red, // Default color to 'red' if not provided
  bordered,
  className = '',
  children,
  ...props
}) => {
  // Define base color classes based on the Colors enum
  const colorClass = getColorClass(color); // Get the Tailwind CSS class based on the color enum

  // Function to map Colors enum to Tailwind CSS classes
  function getColorClass(color: Colors): string {
    switch (color) {
      case Colors.warning:
        return 'text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:border-yellow-800 dark:bg-gray-800';
      case Colors.dark:
        return 'text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800';
      case Colors.red:
        return 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800 dark:bg-gray-800';
      case Colors.gray:
        return 'text-gray-800 border-gray-300 bg-gray-50 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-800';
      case Colors.light:
        return 'text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800 dark:bg-gray-800';
      default:
        return 'text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800 dark:bg-gray-800'; // Default to 'red' if color is not recognized
    }
  }

  return (
    <div
      {...props}
      className={`flex items-center p-4 mb-4 text-sm ${colorClass} border rounded-lg ${className}`}
      role="alert"
    >
      <InfoIcon className="flex-shrink-0 inline w-6 h-5 me-6" />
      <span className="sr-only">Info</span>
      <div>
        {children}
      </div>
    </div>
  );
};

export default BannerAlert;

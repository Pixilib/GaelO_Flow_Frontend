import React, { useState, useEffect, useRef } from 'react';

type PopoverProps = {
  children: React.ReactNode;
  withOnClick: boolean;
  popover: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'bottom-left' | 'bottom-right';
  className?: string;
  backgroundColor?: string; // Color class name
};

const Popover: React.FC<PopoverProps> = ({
  children,
  popover,
  withOnClick = false,
  placement = 'bottom',
  className = '',
  backgroundColor = 'bg-secondary', // Default background color
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLSpanElement | null>(null);

  const getPlacementClasses = (placement: string) => {
    switch (placement) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'bottom-left':
        return 'top-full left-0 transform mt-2';
      case 'bottom-right':
        return 'top-full right-0 transform mt-2';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    }
  };

  const handleEvent = withOnClick
    ? { onClick: () => setIsOpen(!isOpen) }
    : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current && !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" data-gaelo-flow="Popover">
      <span {...handleEvent} ref={triggerRef}>
        {children}
      </span>
      {isOpen && (
        <div
          ref={popoverRef}
          className={`absolute ${getPlacementClasses(placement)} z-50 rounded-lg p-4 text-gray-600 shadow-md dark:text-gray-400 ${className} ${backgroundColor}`}
        >
          {popover}
        </div>
      )}
    </div>
  );
};

export default Popover;

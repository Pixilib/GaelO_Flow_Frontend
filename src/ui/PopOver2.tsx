import React from 'react';
import Button from './Button';

type PopoverProps = {
  buttonComponent: React.ReactElement<typeof Button>;
  popoverId: string;
  className?: string;
  children: React.ReactNode;
}& React.HTMLAttributes<HTMLDivElement>;

const PopoverComponent: React.FC<PopoverProps> = ({
  buttonComponent: Button,
  popoverId,
  className = "",
  children
}) => {
  return (
    <div>
      {/* Bouton personnalisé pour ouvrir/fermer le popover */}
      <Button popoverTarget={popoverId} />
      {/* Contenu du Popover */}
      <div
        id={popoverId}
        popOver
        className={`mt-2 bg-gray-100 border border-gray-300 rounded shadow-lg p-4 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PopoverComponent;

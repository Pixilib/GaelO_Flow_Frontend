import React from 'react';
import CloseButton from './CloseButton';

type ModalProps = {
  triggerButton: React.ReactElement; // Prop pour le bouton de déclenchement
  className?: string;
  children: React.ReactNode;
};

const Modal3: React.FC<ModalProps> = ({ triggerButton, className = "", children }) => {
  const openDialog = (event: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    const dialog = (event.currentTarget.nextElementSibling as HTMLDialogElement);
    if (dialog) {
      dialog.showModal();
    }
  };

  const closeDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    const dialog = (event.currentTarget.closest('dialog') as HTMLDialogElement);
    if (dialog) {
      dialog.close();
    }
  };

  const trigger = React.cloneElement(triggerButton, { onClick: openDialog });

  return (
    <div className="relative">
      {trigger}
      
      <dialog className={`p-6 bg-lightGray rounded-xl shadow-lg ${className}`}>
        <div className="flex justify-end">
          <CloseButton 
            onClose={closeDialog} 
            variant="danger" 
            className="-mt-1 -mr-2"
          />          
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default Modal3;

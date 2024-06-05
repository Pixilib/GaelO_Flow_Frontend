import React from 'react';
import { BiX } from "react-icons/bi"; 
import { BiCheck } from "react-icons/bi"; 


import Modal3 from './Modal3';
import Button from './Button';
import { Colors } from '../utils';

type ConfirmationModalProps = {
  triggerButton: React.ReactElement;
  className?: string;
  message:string; // Message à afficher dans la modal
  onConfirm: () => void; // Fonction à appeler lors de la confirmation
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ triggerButton, className = "", onConfirm, message }) => {
  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    onConfirm();
    const dialog = (event.currentTarget.closest('dialog') as HTMLDialogElement);
    if (dialog) {
      dialog.close();
    }
  };

  return (
    <Modal3 
      triggerButton={triggerButton} 
      className={className}
    >
      <div>
        <p className='my-5 font-bold'> {message} </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            type="button" 
            color={Colors.danger}
            className="gap-1"
            onClick={(event) => {
              const dialog = (event.currentTarget.closest('dialog') as HTMLDialogElement);
              if (dialog) {
                dialog.close();
              }
            }} 
          >
            <BiX />
            No
          </Button>
          <Button 
            type="button" 
            color={Colors.success}
            className="gap-1"
            onClick={handleConfirm} 
          >
            <BiCheck />
            Yes
          </Button>
        </div>
      </div>
    </Modal3>
  );
};

export default ConfirmationModal;

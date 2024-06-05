import React from 'react';
import CloseButton from './CloseButton';

type ModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  className?: string;
  children: React.ReactNode;
};

const Modal = ({ dialogRef, closeDialog, className = "", children }: ModalProps) => {
  return (
    <dialog data-gaelo-flow="modal" ref={dialogRef} className={` p-6 bg-lightGray border-2 rounded-xl shadow-xl ${className}`}>
      <div className="flex justify-end">
        <CloseButton
          onClose={closeDialog}
          variant="danger"
          className="-mt-1 -mr-2"
        />
      </div>
      {children}
    </dialog>
  );
};

export default Modal;

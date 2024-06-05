import React from 'react';
import { BiX, BiCheck } from "react-icons/bi";

import { Colors } from '../utils';
import { Modal, Button } from '../ui';

type ConfirmModalProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  onConfirm: () => void;
  className?: string;
  message: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ dialogRef, closeDialog, className = "", onConfirm, message }) => {

  const handleConfirm = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <Modal data-gaelo-flow="confirm-modal" dialogRef={dialogRef} closeDialog={closeDialog} className={className}>
        <p className='my-5'>{message}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            color={Colors.danger}
            className="gap-1"
            onClick={closeDialog}
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
    </Modal>
  );
};

export default ConfirmModal;

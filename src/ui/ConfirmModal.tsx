// import React from 'react';
// import { BiX, BiCheck } from "react-icons/bi";
import { Colors } from '../utils';
import Button from './Button';
import Modal from './Modal';



type ConfirmModalProps = {
  title? : string;
  content? : string;
  confirmLabel? : string;
  cancelLabel? : string;
  onConfirm : () => void;
  onCancel : () => void;
  onClose : () => void;
  show : boolean;
}
const ConfirmModal = ({
  title = 'Confirmation',
  content = 'Do you confirm your action?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  onClose,
  show
}:ConfirmModalProps) => {
  return (
    <Modal show={show} data-gaelo-flow='confirm-dialog' size='sm'>
      <Modal.Header
        data-gaelo-flow='confirm-dialog-header'
        onClose={onClose}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ maxHeight: '600px' }}
        data-gaelo-flow='confirm-dialog-body'
      >
        {content}
      </Modal.Body>

      <Modal.Footer data-gaelo-flow='confirm-dialog-footer'>
        <div className='flex justify-end gap-3'>
          <Button
            color={Colors.primary}
            onClick={onConfirm}
            data-gaelo-flow='confirm-dialog-confirm-button'
          >
            {confirmLabel}
          </Button>
          <Button
            color={Colors.dark}
            onClick={onCancel}
            data-gaelo-flow='confirm-dialog-cancel-button'
          >
            {cancelLabel}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default ConfirmModal;
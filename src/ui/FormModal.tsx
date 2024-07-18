import React, { ReactNode, FormEvent } from 'react';
import Modal from './Modal';
import CloseButton from './CloseButton';

type FormModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  show: boolean;
  className?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

const FormModal: React.FC<FormModalProps> = ({
  title,
  children,
  onClose,
  show,
  className,
  onSubmit
}) => {
  return (
    <Modal show={show} onClose={onClose} size='xl'>
      <div className={`overflow-hidden bg-white rounded-lg shadow-xl ${className}`}>
        <div className="flex items-center justify-between px-6 py-4 bg-gray-100">
          <span className="text-lg font-medium text-gray-900">{title}</span>
          <CloseButton onClose={onClose} variant='warning' />
        </div>
        <div className="px-6 py-4">
          {onSubmit ? (
            <form onSubmit={onSubmit} className="grid gap-y-2 lg:gap-y-4">
              {children}
            </form>
          ) : (
            <div className="grid gap-y-2 lg:gap-y-4">{children}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;
import { useCallback, useRef } from 'react';

export const useModal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      document.body.classList.add('body-blur');
    }
  }, []);

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.classList.remove('body-blur');
    }
  }, []);

  return { dialogRef, openDialog, closeDialog };
};


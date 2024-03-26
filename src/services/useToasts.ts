import { useCallback, useContext } from "react";
import ToastContext, { Toast } from "../../src/ui/toast/ToastContext";

export default function useToasts() {
  const { pushToastRef, updateToastRef } = useContext(ToastContext);
  return {
    pushToast: useCallback(
      (toast: Toast) => {
        return pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
    updateToast: useCallback(
      (id: number, toast: Toast) => {
        updateToastRef.current(id, toast);
      },
      [updateToastRef]
    ),
  };
}
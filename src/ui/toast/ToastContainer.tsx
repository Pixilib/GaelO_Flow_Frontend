import { ComponentProps, useContext, useState } from "react";
import ToastContext, { Toast } from "./ToastContext";
import ToastComponent from "./Toast";

type ToastItem = ComponentProps<typeof ToastComponent> & {
  id: number,
  duration: number,
  timer: ReturnType<typeof setTimeout>;
};

type ToastContainerProps = {
  className?: string
}

function ToastContainer({ className }:ToastContainerProps) {

  const [toasts, setToasts] = useState([] as ToastItem[]);

  const { pushToastRef, updateToastRef } = useContext(ToastContext);

  pushToastRef.current = ({ duration = 5, ...props }: Toast) => {
    const id = Math.random();
    const timer = setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== id));
    }, (duration) * 1000);
    const newToast = { ...props, id, timer, duration };
    setToasts((toasts: ToastItem[]) => [...toasts, newToast]);
    return id
  };

  updateToastRef.current = (id: number, newToast: Toast) => {
    setToasts((toasts: ToastItem[]) => {
      return toasts.map((toast) => {
        if (toast.id === id) {
          if (newToast.duration) {
            clearTimeout(toast.timer);
            toast.timer = setTimeout(() => {
              setToasts((v) => v.filter((t) => t.id !== id));
            }, (newToast.duration) * 1000);
          }

          toast = {
            ...toast,
            ...newToast
          }
        }
        return toast
      })
    })
  }

  const onRemove = (toast: ToastItem) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
    if (toast.onClose) {
      toast.onClose();
    }

  };

  return (
    <ToastContext.Provider value={{ pushToastRef, updateToastRef }}>
      <div data-gaelo-flow='toast-container' className={`z-[1300] ${className}`}>
        <div className="fixed bottom-2 right-2" >
          {toasts.filter(toast => toast.position === 'bottom-right').map((toast) => (
            <ToastComponent key={toast.id} {...toast} />
          ))}
        </div>
        <div className="fixed bottom-2 left-2" >
          {toasts.filter(toast => toast.position === 'bottom-left').map((toast) => (
            <ToastComponent key={toast.id} {...toast} />
          ))}
        </div>
        <div className="fixed left-2 top-2" >
          {toasts.filter(toast => toast.position === 'top-left').map((toast) => (
            <ToastComponent key={toast.id} {...toast} />
          ))}
        </div>
        <div className="fixed right-2 top-2" >
          {toasts.filter(toast => toast.position === 'top-right').map((toast) => (
            <ToastComponent key={toast.id} {...toast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
export default ToastContainer;
import { createContext } from "react";

export type Toast = {
  content: string | React.ReactNode;
  type?: "success" | "danger" | "warning" | "info";
  animation?: "slide-left" | "slide-right";
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  onClose?: () => void;
  duration?: number,
};

const defaultValue = {
  pushToastRef: { current: (_toast:Toast) : number=> {return 1} },
  updateToastRef: { current: (_id :number, _toast: Toast) => { } },
};

const ToastContext = createContext(defaultValue);

export default ToastContext;
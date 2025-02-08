import useToasts from "../services/useToasts";
export const useCustomToast = () => {
  const { pushToast, updateToast } = useToasts();

  const toastSuccess = (message: string, duration = 3) => {
    return pushToast({
      content: message,
      type: "success",
      duration,
      position: "bottom-right",
      animation: "slide-left",
    });
  };

  const toastWarning = (message: string, duration = 3) => {
    return pushToast({
      content: message,
      type: "warning",
      duration,
      position: "bottom-right",
      animation: "slide-left",
    });
  };

  const toastError = (message: string, duration = 3) => {
    return pushToast({
      content: message,
      type: "danger",
      duration,
      position: "bottom-right",
      animation: "slide-left",
    });
  };

  const toastInfo = (message: string, duration = 3) => {
    return pushToast({
      content: message,
      type: "info",
      duration,
      position: "bottom-right",
      animation: "slide-left",
    });
  };

  const updateExistingToast = (id: number, message: string, duration = 3) => {
    updateToast(id, { content: message, duration });
  };

  return {
    toastSuccess,
    toastWarning,
    toastError,
    toastInfo,
    updateExistingToast,
  };
};


import useToasts from '../services/useToasts'
export const useCustomToast = () => {
    const { pushToast } = useToasts()

    const toastSuccess = (message: string) => {
        pushToast({ content: message, type: 'success', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastWarning = (message: string) => {
        pushToast({ content: message, type: 'warning', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastError = (message: string) => {
        pushToast({ content: message, type: 'danger', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastInfo = (message: string) => {
        pushToast({ content: message, type: 'info', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    return { toastSuccess, toastWarning, toastError, toastInfo }
}
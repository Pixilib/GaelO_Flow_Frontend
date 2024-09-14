
import useToasts from '../services/useToasts'
export const useCustomToast = () => {
    const { pushToast, updateToast } = useToasts()

    const toastSuccess = (message: string) => {
        return pushToast({ content: message, type: 'success', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastWarning = (message: string) => {
        return pushToast({ content: message, type: 'warning', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastError = (message: string) => {
        return pushToast({ content: message, type: 'danger', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const toastInfo = (message: string) => {
        return pushToast({ content: message, type: 'info', duration: 1.3, position: 'bottom-right', animation: 'slide-left' })
    }

    const updateExistingToast = (id :number, message : string)=>{
        updateToast(id, {content : message})
    }

    return { toastSuccess, toastWarning, toastError, toastInfo, updateExistingToast }
}

import useToasts from '../services/useToasts'
export const useCustomToast = () => {
    const { pushToast } = useToasts()

    const toastSuccess = (message: string) => {
        pushToast({ content: message, type: 'success', duration: 5, position: 'bottom-right', animation: 'slide-left' })
        console.log('toast success')
    }

    const toastWarning = (message: string) => {
        pushToast({ content: message, type: 'warning', duration: 5, position: 'bottom-right', animation: 'slide-left' })
        console.log('toast warning')
    }

    const toastError = (message: string) => {
        pushToast({ content: message, type: 'danger', duration: 5, position: 'bottom-right', animation: 'slide-left' })
        console.log('toast danger')
    }

    const toastInfo = (message: string) => {
        pushToast({ content: message, type: 'info', duration: 5, position: 'bottom-right', animation: 'slide-left' })
        console.log('toast info')
    }

    return { toastSuccess, toastWarning, toastError, toastInfo }
}
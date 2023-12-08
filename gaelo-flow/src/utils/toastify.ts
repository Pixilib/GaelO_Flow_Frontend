
import { toast } from 'react-toastify'

type ToastType = string;
export const toastSuccess= (message:ToastType)=> {
    const toastify = toast.success
    toastify(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    })
}

export const toastwarning = (message:ToastType)=> {
    const toastify = toast.warning
    toastify(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    })
}

export const toastError = (message:ToastType)=> {
    const toastify = toast.error
    toastify(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false
    })
}
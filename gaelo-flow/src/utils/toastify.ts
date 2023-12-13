
import { toast } from 'react-toastify'

export const toastSuccess= (message :string)=> {
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

export const toastwarning = (message :string)=> {
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

export const toastError = (message :string)=> {
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
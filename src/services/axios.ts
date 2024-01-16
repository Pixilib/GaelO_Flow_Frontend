/**
Copyright (c) 2021 - 2023 Pixilib
 */

import axios from 'axios'
import { toast } from 'react-toastify'
import { store } from '../store'
import { logout } from '../reducers/UserSlice'

axios.interceptors.request.use((req) => {
    const myToken = getToken()
    if (myToken) req.headers.authorization = `Bearer ${myToken}`

    return req
})

const UNAUTHORIZED = 401

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const status = error?.response?.status
        const urlString = error?.response?.config?.url
        if (
            status === UNAUTHORIZED &&
            urlString &&
            !urlString.startsWith('api/auth/login')
        ) {
            // Singleton toast using fixed id to avoid multiple toast if multiple api call are 401
            toast.error('Session expired. Please reauthenticate.', {
                toastId: 'reauthenticate'
            })

            store.dispatch(logout())
        }
        return Promise.reject(error)
    }
)

export const getToken = () => {
    return store?.getState()?.user.token
}

export default axios
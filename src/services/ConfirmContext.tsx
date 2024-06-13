import { createContext } from 'react'

const ConfirmContext = createContext({
    confirmRef: {
        current: (_props: any) => Promise.resolve(true)
    }
})

export default ConfirmContext
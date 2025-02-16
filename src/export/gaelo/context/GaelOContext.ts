import { createContext } from 'react'

const GaelOContext = createContext({
    userId: null,
    token: null,
    studyName: null,
    role : null
})

export default GaelOContext
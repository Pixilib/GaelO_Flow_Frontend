import { createContext } from 'react'

const GaelOContext = createContext({
    userId: null,
    token: null,
    studyName: null,
    role : null,
    study : null
})

export default GaelOContext
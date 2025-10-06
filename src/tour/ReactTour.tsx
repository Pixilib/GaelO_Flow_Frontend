import React from 'react'
import { useTour } from '@reactour/tour'
type ReactTourProps = {
    steps: { selector : string, content: string; }[]
    children : React.ReactNode
}

const ReactTour = ({ steps, children }: ReactTourProps) => {

    const { isOpen, currentStep, steps : stepsTour, setIsOpen, setCurrentStep, setSteps } = useTour()

    const startTour = () => {
        if (!setSteps) return
        setCurrentStep(0)
        const filteredSteps = filterVisibleSteps()
        setSteps(filteredSteps)
        setIsOpen(true)
    }

    const filterVisibleSteps = () => {
        return steps.filter((step) => {
            let selector = step.selector
            return document.querySelectorAll(selector).length > 0
        })
    }
    
    return (
        <div className='tw:flex tw:justify-end'>
            <div onClick={() => startTour()} >
                {children}
            </div>
        </div>
    )
}

export default ReactTour;
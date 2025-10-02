import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'

const HelpPatientInvestigator = () => {
    const steps = [
        {
            selector: '[data-gaelo-flow="job-status-panel"]',
            content: 'This panel shows the status of your jobs (Retrieve, Anonymize and Delete Jobs)',
        },
    ]

    return (
        <ReactTour steps={steps} >
            <Badge
                rounded='full'
                style={{ cursor: 'help' }}
                variant='warning'
            >
                ?
            </Badge>
        </ReactTour >
    )
}

export default HelpPatientInvestigator
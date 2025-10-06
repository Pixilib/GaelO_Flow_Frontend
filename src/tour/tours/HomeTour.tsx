import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const HelpPatientInvestigator = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="job-status-panel"]',
            content: t('tour.home.home-page'),
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
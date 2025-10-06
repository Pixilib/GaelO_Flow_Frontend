import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const CDBurnerTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="cd-burner-datatable"]',
            content: t('tour.cd-burner.datatable'),
        },
        {
            selector: '[data-gaelo-flow="cd-burner-speaker"]',
            content: t('tour.cd-burner.speaker'),
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

export default CDBurnerTour

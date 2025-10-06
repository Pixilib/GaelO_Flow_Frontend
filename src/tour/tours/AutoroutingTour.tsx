import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const AutoroutingTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="routing-datatable"]',
            content: t('tour.routing.datatable'),
        },
        {
            selector: '[data-gaelo-flow="routing-buttons"]',
            content: t('tour.routing.buttons'),
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

export default AutoroutingTour

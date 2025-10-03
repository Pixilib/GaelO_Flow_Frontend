import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const QueriesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="queries-dropCSV"]',
            content: t('tour.routing.modal.name'),
        },
        {
            selector: '[data-gaelo-flow="queries-addLine"]',
            content: t('tour.routing.queries.add-destination'),
        },
        {
            selector: '[data-gaelo-flow="queries-downloadCSV"]',
            content: t('tour.routing.queries.rule-fields'),
        },
        {
            selector: '[data-gaelo-flow="queries-datatable"]',
            content: t('tour.routing.modal.even-type'),
        },
        {
            selector: '[data-gaelo-flow="queries-start"]',
            content: t('tour.routing.modal.rules'),
        },
        {
            selector: '[data-gaelo-flow="queries-delete"]',
            content: t('tour.routing.queries.add-rule'),
        }
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

export default QueriesTour

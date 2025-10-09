import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const QueriesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="query-addLine"]',
            content: t('tour.auto-retrieve.query.plus'),
        },
        {
            selector: '[data-gaelo-flow="query-dropCSV"]',
            content: t('tour.auto-retrieve.query.drop-csv'),
        },
        {
            selector: '[data-gaelo-flow="query-downloadCSV"]',
            content: t('tour.auto-retrieve.query.download-csv'),
        },
        {
            selector: '[data-gaelo-flow="query-datatable"]',
            content: t('tour.auto-retrieve.query.datatable'),
        },
        {
            selector: '[data-gaelo-flow="query-start"]',
            content: t('tour.auto-retrieve.query.start-queries'),
        },
        {
            selector: '[data-gaelo-flow="query-delete"]',
            content: t('tour.auto-retrieve.query.delete'),
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

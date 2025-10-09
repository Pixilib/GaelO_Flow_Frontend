import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const ResultsTour = () => {
    const { t } = useTranslation()
    const steps = [
         // onglet studies
        {
            selector: '[data-gaelo-flow="results-datatable"]',
            content: t('tour.auto-retrieve.results.datatable'),
        },
        {
            selector: '[data-gaelo-flow="results-add-to-basket"]',
            content: t('tour.auto-retrieve.results.add-to-basket'),
        },
        {
            selector: '[data-gaelo-flow="results-query-series"]',
            content: t('tour.auto-retrieve.results.query-series'),
        },
        {
            selector: '[data-gaelo-flow="results-download-csv"]',
            content: t('tour.auto-retrieve.results.download-csv'),
        },
        {
            selector: '[data-gaelo-flow="results-delete"]',
            content: t('tour.auto-retrieve.results.delete'),
        },
        // onglet series
        {
            selector: '[data-gaelo-flow="results-load-from-csv"]',
            content: t('tour.auto-retrieve.results.load-from-csv'),
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

export default ResultsTour

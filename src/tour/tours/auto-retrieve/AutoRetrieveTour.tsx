import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const QueriesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {//queries onglet
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
        },
        //result onglet
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
        {
            selector: '[data-gaelo-flow="results-load-from-csv"]',
            content: t('tour.auto-retrieve.results.load-from-csv'),
        },
        // basket onglet
        {
            selector: '[data-gaelo-flow="basket-datatable"]',
            content: t('tour.auto-retrieve.basket.datatable'),
        },
        {
            selector: '[data-gaelo-flow="basket-start-robot"]',
            content: t('tour.auto-retrieve.basket.start-robot'),
        },
        {
            selector: '[data-gaelo-flow="basket-delete"]',
            content: t('tour.auto-retrieve.basket.delete'),
        },
        // robot onglet
        {
            selector: '[data-gaelo-flow="robot-buttons"]',
            content: t('tour.auto-retrieve.task.buttons'),
        },
        {
            selector: '[data-gaelo-flow="robot-datatable"]',
            content: t('tour.auto-retrieve.task.datatable'),
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

import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const DatasetsTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="dataset-labels"]',
            content: t('tour.dataset.label'),
        },
        {
            selector: '[data-gaelo-flow="dataset-buttons"]',
            content: t('tour.dataset.buttons'),
        },
        {
            selector: '[data-gaelo-flow="dataset-studies"]',
            content: t('tour.dataset.studies'),
        },
        {
            selector: '[data-gaelo-flow="study-actions"]',
            content: t('tour.dataset.study-actions'),
        },
        {
            selector: '[data-gaelo-flow="dataset-series"]',
            content: t('tour.dataset.series'),
        },
        {
            selector: '[data-gaelo-flow="series-actions"]',
            content: t('tour.dataset.series-actions'),
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

export default DatasetsTour

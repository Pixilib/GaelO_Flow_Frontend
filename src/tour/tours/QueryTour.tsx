import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const QueryTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="query-form"]',
            content: t('tour.query.form'),
        },
        {
            selector: '[data-gaelo-flow="query-studies"]',
            content: t('tour.query.studies'),
        },
        {
            selector: '[data-gaelo-flow="query-dowload-studies"]',
            content: t('tour.query.dowload-studies'),
        },
        {
            selector: '[data-gaelo-flow="query-series"]',
            content: t('tour.query.series'),
        },
        {
            selector: '[data-gaelo-flow="query-dowload-series"]',
            content: t('tour.query.dowload-series'),
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

export default QueryTour
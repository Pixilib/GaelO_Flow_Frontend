import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const ContentTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="content-form"]',
            content: t('tour.content.form'),
        },
        {
            selector: '[data-gaelo-flow="content-buttons"]',
            content: t('tour.content.buttons'),
        },
        {
            selector: '[data-gaelo-flow="content-patient-info"]',
            content: t('tour.content.patient-info'),
        },
        {
            selector: '[data-gaelo-flow="content-Burn-cd"]',
            content: t('tour.content.burn-cd'),
        },
        {
            selector: '[data-gaelo-flow="content-edit"]',
            content: t('tour.content.edit'),
        },
        {
            selector: '[data-gaelo-flow="content-download"]',
            content: t('tour.content.download'),
        },
        {
            selector: '[data-gaelo-flow="content-delete"]',
            content: t('tour.content.delete'),
        },
        {
            selector: '[data-gaelo-flow="content-study"]',
            content: t('tour.content.studies'),
        },
        {
            selector: '[data-gaelo-flow="study-actions"]', 
            content: t('tour.content.study-actions'),
        },
        {
            selector: '[data-gaelo-flow="content-series"]',
            content: t('tour.content.series'),
        },
        {
            selector: '[data-gaelo-flow="series-actions"]',
            content: t('tour.content.series-actions'),
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

export default ContentTour

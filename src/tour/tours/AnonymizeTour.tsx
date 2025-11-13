import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const AutoroutingTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="anonymize-auto-fill"]',
            content: t('tour.anonymize.auto-fill'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-delete"]',
            content: t('tour.anonymize.delete'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-table"]',
            content: t('tour.anonymize.patient-table'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-study-table"]',
            content: t('tour.anonymize.study-table'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-button"]',
            content: t('tour.anonymize.anonymize-button'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-default"]',
            content: t('tour.anonymize.profile'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-result-table"]',
            content: t('tour.anonymize.result-table'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-send-to-other-module"]',
            content: t('tour.anonymize.send-button'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-export-CSV"]',
            content: t('tour.anonymize.export-CSV'),
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

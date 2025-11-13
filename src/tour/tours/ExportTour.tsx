import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const AutoroutingTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="export-download"]',
            content: t('tour.export.export'),
        },
        {
            selector: '[data-gaelo-flow="export-delete"]',
            content: t('tour.export.delete'),
        },
        {
            selector: '[data-gaelo-flow="export-setting"]',
            content: t('tour.export.settings'),
        },
        {
            selector: '[data-gaelo-flow="export-button"]',
            content: t('tour.export.send-to'),
        },
        {
            selector: '[data-gaelo-flow="export-study-table"]',
            content: t('tour.export.study-table'),
        },
        {
            selector: '[data-gaelo-flow="export-series-table"]',
            content: t('tour.export.series-table'),
        },
        {
            selector: '[data-gaelo-flow="export-choose-download"]',
            content: t('tour.export.download'),
        },
        {
            selector: '[data-gaelo-flow="export-send-modality"]',
            content: t('tour.export.send-modality'),
        },
        {
            selector: '[data-gaelo-flow="export-send-peer"]',
            content: t('tour.export.send-peer'),
        },
        {
            selector: '[data-gaelo-flow="export-send-gaelo"]',
            content: t('tour.export.send-gaelo'),
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

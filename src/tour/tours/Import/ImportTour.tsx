import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const ImportTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="import-select"]',
            content: t('tour.import.select-labels'),
        },
        {
            selector: '[data-gaelo-flow="import-drop-dicom"]',
            content: t('tour.import.drop-dicom'),
        },
        {
            selector: '[data-gaelo-flow="import-buttons"]',
            content: t('tour.import.buttons'),
        },
        {
            selector: '[data-gaelo-flow="import-studies"]',
            content: t('tour.import.studies'),
        },
        {
            selector: '[data-gaelo-flow="import-series"]',
            content: t('tour.import.series'),
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

export default ImportTour
import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const ImportCreateTour = () => {
    const { t } = useTranslation()
    const steps = [
        {// import onglet
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
        },
        // create onglet
        {
            selector: '[data-gaelo-flow="import-drop-image"]',
            content: t('tour.import.drop-image'),
        },
        {
            selector: '[data-gaelo-flow="import-dicom-tags"]',
            content: t('tour.import.dicom-tags'),
        },
        {
            selector: '[data-gaelo-flow="import-add-tag"]',
            content: t('tour.import.add-tag'),
        },
        {
            selector: '[data-gaelo-flow="import-datatable"]',
            content: t('tour.import.tags'),
        },
        {
            selector: '[data-gaelo-flow="import-create-dicoms"]',
            content: t('tour.import.create-dicoms'),
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

export default ImportCreateTour
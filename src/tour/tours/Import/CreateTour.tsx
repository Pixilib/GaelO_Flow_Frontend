import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const CreateTour = () => {
    const { t } = useTranslation()
    const steps = [
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
            content: t('tour.import.datatable'),
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

export default CreateTour
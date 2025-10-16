import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const ModalitiesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="modalities-datatable"]',
            content: t('tour.admin.modalities.datatable'),
        },
        {
            selector: '[data-gaelo-flow="modalities-action-buttonEcho"]',
            content: t('tour.admin.modalities.button-echo'),
        },
        {
            selector: '[data-gaelo-flow="modalities-action-buttonDelete"]',
            content: t('tour.admin.modalities.button-delete'),
        },
        {
            selector: '[data-gaelo-flow="modalities-button-newModality"]',
            content: t('tour.admin.modalities.button-modality'),
        },
        {
            selector: '[data-gaelo-flow="modalities-form-modality"]',
            content: t('tour.admin.modalities.form-modality'),
        },
        {
            selector: '[data-gaelo-flow="modalities-submit"]',
            content: t('tour.admin.modalities.submit'),
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

export default ModalitiesTour
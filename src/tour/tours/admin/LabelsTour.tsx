import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const LabelsTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="labels-add-labels"]',
            content: t('tour.admin.labels.add-labels'),
        },
        {
            selector: '[data-gaelo-flow="labels-datatable"]',
            content: t('tour.admin.labels.datatable'),
        },
        {
            selector: '[data-gaelo-flow="labels-roles"]',
            content: t('tour.admin.labels.roles'),
        },
        {
            selector: '[data-gaelo-flow="labels-delete"]',
            content: t('tour.admin.labels.delete'),
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

export default LabelsTour
import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const JobsTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="jobs-datatable"]',
            content: t('tour.admin.jobs.datatable'),
        },
        {
            selector: '[data-gaelo-flow="jobs-buttonReset"]',
            content: t('tour.admin.jobs.button-reset'),
        },
        {
            selector: '[data-gaelo-flow="jobs-buttonPlay"]',
            content: t('tour.admin.jobs.button-play'),
        },
        {
            selector: '[data-gaelo-flow="jobs-buttonPause"]',
            content: t('tour.admin.jobs.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="jobs-buttonCancel"]',
            content: t('tour.admin.jobs.button-cancel'),
        },
        {
            selector: '[data-gaelo-flow="jobs-info"]',
            content: t('tour.admin.jobs.info'),
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

export default JobsTour
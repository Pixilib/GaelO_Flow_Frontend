import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const ModalitiesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="peers-datatable"]',
            content: t('tour.admin.peers.table-peers'),
        },
        {
            selector: '[data-gaelo-flow="peers-action-button-echo"]',
            content: t('tour.admin.peers.button-echo'),
        },
        {
            selector: '[data-gaelo-flow="peers-action-button-delete"]',
            content: t('tour.admin.peers.button-delete'),
        },
        {
            selector: '[data-gaelo-flow="peers-button-new-peers"]',
            content: t('tour.admin.peers.button-peers'),
        },
        {
            selector: '[data-gaelo-flow="peers-form-peers"]',
            content: t('tour.admin.peers.form-peers'),
        },
        {
            selector: '[data-gaelo-flow="peers-submit"]',
            content: t('tour.admin.peers.submit'),
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
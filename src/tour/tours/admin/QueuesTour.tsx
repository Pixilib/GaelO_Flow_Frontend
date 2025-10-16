import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const QueuesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {// onglet retrieve
            selector: '[data-gaelo-flow="retrieve-startTime"]',
            content: t('tour.admin.queues.start-time'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-stopTime"]',
            content: t('tour.admin.queues.stop-time'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-totalTime"]',
            content: t('tour.admin.queues.total-time'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-send"]',
            content: t('tour.admin.queues.send'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-buttonPlay"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-buttonPause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-buttonDelete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet anonymize
            selector: '[data-gaelo-flow="anonymize-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-keepLabels"]',
            content: t('tour.admin.queues.keep-labels'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-buttonPlay"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-buttonPause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-buttonDelete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet delete
            selector: '[data-gaelo-flow="delete-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="delete-buttonPlay"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="delete-buttonPause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="delete-buttonDelete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet processing
            selector: '[data-gaelo-flow="processing-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="processing-buttonPlay"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="processing-buttonPause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="processing-buttonDelete"]',
            content: t('tour.admin.queues.button-delete'),
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

export default QueuesTour
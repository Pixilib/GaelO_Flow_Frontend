import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const QueuesTour = () => {
    const { t } = useTranslation()
    const steps = [
        {// onglet retrieve
            selector: '[data-gaelo-flow="retrieve-start-time"]',
            content: t('tour.admin.queues.start-time'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-stop-time"]',
            content: t('tour.admin.queues.stop-time'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-total-time"]',
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
            selector: '[data-gaelo-flow="retrieve-button-play"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-button-pause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="retrieve-button-delete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet anonymize
            selector: '[data-gaelo-flow="anonymize-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-keep-labels"]',
            content: t('tour.admin.queues.keep-labels'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-button-play"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-button-pause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="anonymize-button-delete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet delete
            selector: '[data-gaelo-flow="delete-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="delete-button-play"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="delete-button-pause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="delete-button-delete"]',
            content: t('tour.admin.queues.button-delete'),
        },
        {//onglet processing
            selector: '[data-gaelo-flow="processing-datatable"]',
            content: t('tour.admin.queues.datatable'),
        },
        {
            selector: '[data-gaelo-flow="processing-button-play"]',
            content: t('tour.admin.queues.button-play'),
        },
        {
            selector: '[data-gaelo-flow="processing-button-pause"]',
            content: t('tour.admin.queues.button-pause'),
        },
        {
            selector: '[data-gaelo-flow="processing-button-delete"]',
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
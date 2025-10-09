import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const ModalRoutingTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="modal-name"]',
            content: t('tour.routing.modal.name'),
        },
        {
            selector: '[data-gaelo-flow="modal-eventype"]',
            content: t('tour.routing.modal.even-type'),
        },
        {
            selector: '[data-gaelo-flow="modal-rules"]',
            content: t('tour.routing.modal.rules'),
        },
        {
            selector: '[data-gaelo-flow="modal-addRule"]',
            content: t('tour.routing.modal.add-rule'),
        },
        {
            selector: '[data-gaelo-flow="modal-ruleFields"]',
            content: t('tour.routing.modal.rule-fields'),
        },
        {
            selector: '[data-gaelo-flow="modal-addDestination"]',
            content: t('tour.routing.modal.add-destination'),
        },
        {
            selector: '[data-gaelo-flow="modal-destinationFields"]',
            content: t('tour.routing.modal.destination-fields'),
        },
        {
            selector: '[data-gaelo-flow="modal-submit"]',
            content: t('tour.routing.modal.submit'),
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

export default ModalRoutingTour

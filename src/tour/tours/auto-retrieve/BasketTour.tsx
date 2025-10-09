import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const BasketTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="basket-datatable"]',
            content: t('tour.auto-retrieve.basket.datatable'),
        },
        {
            selector: '[data-gaelo-flow="basket-start-robot"]',
            content: t('tour.auto-retrieve.basket.start-robot'),
        },
        {
            selector: '[data-gaelo-flow="basket-delete"]',
            content: t('tour.auto-retrieve.basket.delete'),
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

export default BasketTour

import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const AutoroutingTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="delete-clear-button"]',
            content: t('tour.delete.clear-button'),
        },
        {
            selector: '[data-gaelo-flow="delete-study-table"]',
            content: t('tour.delete.study-table'),
        },
        {
            selector: '[data-gaelo-flow="delete-delete-button"]',
            content: t('tour.delete.delete-button'),
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

export default AutoroutingTour

import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const RobotTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="robot-buttons"]',
            content: t('tour.auto-retrieve.task.buttons'),
        },
        {
            selector: '[data-gaelo-flow="robot-datatable"]',
            content: t('tour.auto-retrieve.task.datatable'),
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

export default RobotTour

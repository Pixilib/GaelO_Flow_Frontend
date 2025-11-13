import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const CDBurnerAdminTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '[data-gaelo-flow="burner-form"]',
            content: t('tour.admin.cd-burner.form'),
        },
        {
            selector: '[data-gaelo-flow="burner-button-save"]',
            content: t('tour.admin.cd-burner.button-save'),
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

export default CDBurnerAdminTour
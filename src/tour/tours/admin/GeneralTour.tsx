import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const GeneralTour = () => {
    const { t } = useTranslation()
    const steps = [
        {//onglet redis
            selector: '[data-gaelo-flow="redis-datatable"]',
            content: t('tour.admin.general.datatable'),
        },
        {//onglet ortanc
            selector: '[data-gaelo-flow="ortanc-datatable"]',
            content: t('tour.admin.general.datatable'),
        },
        {
            selector: '[data-gaelo-flow="ortanc-reset"]',
            content: t('tour.admin.general.reset'),
        },
        {
            selector: '[data-gaelo-flow="ortanc-shutdown"]',
            content: t('tour.admin.general.shutdown'),
        },
        {
            selector: '[data-gaelo-flow="ortanc-info"]',
            content: t('tour.admin.general.info'),
        },
        {
            selector: '[data-gaelo-flow="ortanc-drop-down-menu"]',
            content: t('tour.admin.general.drop-down-menu'),
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

export default GeneralTour
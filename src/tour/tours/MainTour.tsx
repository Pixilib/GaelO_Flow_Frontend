import React from 'react'

import ReactTour from '../ReactTour'
import { MenuItem } from '../../ui'
import { Help } from '../../icons'
import { useTranslation } from 'react-i18next'

const MainTour = () => {
    const { t } = useTranslation()
    const allSteps = [
    {
        selector: '[data-gaelo-flow="sidebar"]',
        content: t('tour.main.sidebar'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="menu-content"]',
        content: t('tour.main.menu'),
        position: 'top'
    },
    {
        selector: '[data-gaelo-flow="tool-anonymize"]',
        content: t('tour.main.anonymize'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="tool-export"]',
        content: t('tour.main.export'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="tool-delete"]',
        content: t('tour.main.delete'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="header-language"]',
        content: t('tour.main.language'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="header-darkmode"]',
        content: t('tour.main.darkmode'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="header-notifications"]',
        content: t('tour.main.notifications'),
        position: 'bottom'
    },
    {
        selector: '[data-gaelo-flow="header-profile"]',
        content: t('tour.main.profile'),
        position: 'bottom'
    }
    ]

    return (
        <ReactTour steps={allSteps} >
            <MenuItem
                title={t("help")}
                icon={<Help className="w-6 h-6" />}
            />
        </ReactTour >
    )
}

export default MainTour

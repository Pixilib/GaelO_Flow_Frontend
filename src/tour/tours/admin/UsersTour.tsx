import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const UsersTour = () => {
    const { t } = useTranslation()
    const steps = [
        {// onglet users
            selector: '[data-gaelo-flow="users-datatable"]',
            content: t('tour.admin.users.datatable'),
        },
        {
            selector: '[data-gaelo-flow="users-editLine"]',
            content: t('tour.admin.users.edit-line'),
        },
        {
            selector: '[data-gaelo-flow="users-deleteLine"]',
            content: t('tour.admin.users.delete-line'),
        },
        {
            selector: '[data-gaelo-flow="users-createUser"]',
            content: t('tour.admin.users.create-user'),
        },
        {
            selector: '[data-gaelo-flow="users-formEditUser"]',
            content: t('tour.admin.users.form-edit-user'),
        },
        {
            selector: '[data-gaelo-flow="users-buttonUpdate"]',
            content: t('tour.admin.users.button-update'),
        },
        {
            selector: '[data-gaelo-flow="users-formUser"]',
            content: t('tour.admin.users.form-user'),
        },
        {
            selector: '[data-gaelo-flow="users-buttonCreateUser"]',
            content: t('tour.admin.users.button-create-user'),
        },
        {//onglet roles
            selector: '[data-gaelo-flow="roles-datatable"]',
            content: t('tour.admin.users.roles.datatable'),
        },
        {
            selector: '[data-gaelo-flow="users-editLine"]',
            content: t('tour.admin.users.role.edit-line'),
        },
        {
            selector: '[data-gaelo-flow="users-deleteLine"]',
            content: t('tour.adminusers.role.delete-line'),
        },
        {
            selector: '[data-gaelo-flow="roles-keepLabels"]',
            content: t('tour.admin.users.roles.keep-labels'),
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
        {//onglet oauth2
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

export default UsersTour
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
            selector: '[data-gaelo-flow="roles-editLine"]',
            content: t('tour.admin.users.roles.edit-line'),
        },
        {
            selector: '[data-gaelo-flow="roles-deleteLine"]',
            content: t('tour.admin.users.roles.delete-line'),
        },
        {
            selector: '[data-gaelo-flow="roles-createRole"]',
            content: t('tour.admin.users.roles.create-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-formEditRole"]',
            content: t('tour.admin.users.roles.form-edit-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-buttonUpdate"]',
            content: t('tour.admin.users.roles.button-update'),
        },
        {
            selector: '[data-gaelo-flow="users-formRole"]',
            content: t('tour.admin.users.roles.form-role'),
        },
        {
            selector: '[data-gaelo-flow="users-buttonCreateRole"]',
            content: t('tour.admin.users.roles.button-create-role'),
        },
        {//onglet oauth2
            selector: '[data-gaelo-flow="oauth2-datatable"]',
            content: t('tour.admin.users.oauth2.datatable'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-deleteLine"]',
            content: t('tour.admin.users.oauth2.delete-line'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-createProvider"]',
            content: t('tour.admin.users.oauth2.create-provider'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-formCreateOauth"]',
            content: t('tour.admin.users.oauth2.form-create-oauth'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-buttonCreate"]',
            content: t('tour.admin.users.oauth2.button-create'),
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

export default UsersTour
import React from 'react'

import ReactTour from '../../ReactTour'
import { Badge } from '../../../ui'
import { useTranslation } from 'react-i18next'

const UsersTour = () => {
    const { t } = useTranslation()
    const steps = [
        {// onglet users
            selector: '[data-gaelo-flow="users-datatable"]',
            content: t('tour.admin.users.table-users'),
        },
        {
            selector: '[data-gaelo-flow="users-edit-line"]',
            content: t('tour.admin.users.button-edit'),
        },
        {
            selector: '[data-gaelo-flow="users-delete-line"]',
            content: t('tour.admin.users.button-delete'),
        },
        {
            selector: '[data-gaelo-flow="users-create-user"]',
            content: t('tour.admin.users.button-create'),
        },
        {
            selector: '[data-gaelo-flow="users-form-edit-user"]',
            content: t('tour.admin.users.form-edit-user'),
        },
        {
            selector: '[data-gaelo-flow="users-button-update"]',
            content: t('tour.admin.users.button-update'),
        },
        {
            selector: '[data-gaelo-flow="users-form-user"]',
            content: t('tour.admin.users.form-create-user'),
        },
        {
            selector: '[data-gaelo-flow="users-button-create-user"]',
            content: t('tour.admin.users.button-create-user'),
        },
        {//onglet roles
            selector: '[data-gaelo-flow="roles-datatable"]',
            content: t('tour.admin.users.roles.table-roles'),
        },
        {
            selector: '[data-gaelo-flow="roles-edit-line"]',
            content: t('tour.admin.users.roles.edit-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-delete-line"]',
            content: t('tour.admin.users.roles.delete-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-create-role"]',
            content: t('tour.admin.users.roles.create-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-form-edit-role"]',
            content: t('tour.admin.users.roles.form-edit-role'),
        },
        {
            selector: '[data-gaelo-flow="roles-button-update"]',
            content: t('tour.admin.users.roles.button-update'),
        },
        {
            selector: '[data-gaelo-flow="users-form-role"]',
            content: t('tour.admin.users.roles.form-role'),
        },
        {
            selector: '[data-gaelo-flow="users-button-create-role"]',
            content: t('tour.admin.users.roles.button-create-role'),
        },
        {//onglet oauth2
            selector: '[data-gaelo-flow="oauth2-datatable"]',
            content: t('tour.admin.users.oauth2.table-oauth'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-delete-line"]',
            content: t('tour.admin.users.oauth2.delete-oauth'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-create-provider"]',
            content: t('tour.admin.users.oauth2.create-provider'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-form-create-oauth"]',
            content: t('tour.admin.users.oauth2.form-create-oauth'),
        },
        {
            selector: '[data-gaelo-flow="oauth2-button-create"]',
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
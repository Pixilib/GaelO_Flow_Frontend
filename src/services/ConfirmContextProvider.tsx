/**
Copyright (c) 2021 - 2024 Pixilib
 */

import React, { useCallback, useContext, useRef, useState } from 'react'
import ConfirmContext from './ConfirmContext'
import { ConfirmModal } from '../ui'

type ConfirmContextProvider = {
    children: React.ReactNode
}
export default ({ children }: ConfirmContextProvider) => {
    const confirmRef = useRef<(props: any) => Promise<boolean>>(() =>
        Promise.resolve(true)
    )
    return (
        <ConfirmContext.Provider value={{ confirmRef }}>
            {children}
            <ConfirmModalWithContext />
        </ConfirmContext.Provider>
    )
}

function ConfirmModalWithContext() {
    const [show, setShow] = useState(false)
    const [props, setProps] = useState<object>()

    const resolveRef = useRef<(state: boolean) => void>(() => {})
    const { confirmRef } = useContext(ConfirmContext)

    confirmRef.current = (props: object) =>
        new Promise((resolve: (state: boolean) => void) => {
            setProps(props)
            setShow(true)
            resolveRef.current = resolve
        })

    const onConfirm = () => {
        resolveRef.current(true)
        setShow(false)
    }

    const onCancel = () => {
        resolveRef.current(false)
        setShow(false)
    }

    const onClose = () => {
        setShow(false)
    }

    return (
        <ConfirmModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            onClose={onClose}
            show={show}
            {...props}
        />
    )
}

export function useConfirm() {
    const { confirmRef } = useContext(ConfirmContext)
    return {
        confirm: useCallback(
            (props: object) => {
                return confirmRef.current(props)
            },
            [confirmRef]
        )
    }
}
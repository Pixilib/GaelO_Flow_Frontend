import React from 'react'

import ReactTour from '../ReactTour'
import { Badge } from '../../ui'
import { useTranslation } from 'react-i18next'

const DatasetsTour = () => {
    const { t } = useTranslation()
    const steps = [
        {
            selector: '',
            content: '',
        },
        {
            selector: '',
            content: '',
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

export default DatasetsTour

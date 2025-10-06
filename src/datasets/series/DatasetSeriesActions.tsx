import React from 'react';
import { Series, useCustomToast } from '../../utils';

import { exportSeriesToNifti } from '../../services/export';
import { DropdownButton } from '../../ui';
import { Download, Edit, Eye } from '../../icons';
import { useTranslation } from "react-i18next";

type DropdownOption = {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    action: () => void;
}

type DataSetSeriesActionsProps = {
    series: Series;
    onActionClick: (action: string, seriesId: string) => void;
};

const DatasetSeriesActions: React.FC<DataSetSeriesActionsProps> = ({ series, onActionClick }) => {

    const { toastSuccess, updateExistingToast } = useCustomToast();
    const {t} = useTranslation()

    const options: DropdownOption[] = [
        {
            label:t("contents.modify"),
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', series.id)
        },
        {
            label: t("contents.metadata"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('metadata', series.id)
        },
        {
            label: t("contents.preview-series"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', series.id)
        },
        {
            icon: <Download />,
            label: t("contents.download-nii.gz"),
            color: 'green',
            action: () => {
                const id = toastSuccess("Download started", 60)
                exportSeriesToNifti(series.id, true, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb", 5))
            },
        }
    ];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };


    return (
        <div onClick={handleClick}>
            <DropdownButton
                data-gaelo-flow="series-actions"
                options={options}
                buttonText="Actions"
            />
        </div>
    );
};


export default DatasetSeriesActions;

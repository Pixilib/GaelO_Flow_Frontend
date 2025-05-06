import React from 'react';
import { Series, useCustomToast } from '../../utils';

import { exportSeriesToNifti } from '../../services/export';
import { DropdownButton } from '../../ui';
import { Edit, Eye } from '../../icons';

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

    const options: DropdownOption[] = [
        {
            label: 'Modify',
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', series.id)
        },
        {
            label: 'Metadata',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('metadata', series.id)
        },
        {
            label: 'Preview Series',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', series.id)
        },
        {
            label: "View Metadata",
            color: 'green',
            action: () => {
                onActionClick("metadata", series.id);
            },
        },
        {
            label: "Download nii.gz",
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
                options={options}
                buttonText="Actions"
            />
        </div>
    );
};


export default DatasetSeriesActions;

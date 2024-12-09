import React from 'react';
import { Series, useCustomToast } from '../../utils';

import { exportSeriesToNifti } from '../../services/export';
import { DropdownButton } from '../../ui';

interface DropdownOption {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    action: () => void;
}

type DataSetSeriesActionsProps = {
    series: Series & { id: string };
};

const DatasetSeriesActions: React.FC<DataSetSeriesActionsProps> = ({ series }) => {

    const { toastSuccess, updateExistingToast } = useCustomToast();


    const options: DropdownOption[] = [
        {
            label: "View Metadata",
            action: () => {
                console.log("View Metadata", series.id);
            },
        },
        {
            label: "Download nii.gz",
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

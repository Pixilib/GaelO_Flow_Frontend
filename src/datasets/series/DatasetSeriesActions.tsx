import React from 'react';
import { Series, useCustomToast } from '../../utils';

import DropdownButton from '../../ui/menu/DropDownButton';
import { exportSeriesToNifti } from '../../services/export';

interface DropdownOption {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    action: (seriesId: string) => void;
}

type DataSetSeriesActionsProps = {
    series: Series & { id: string };
    onActionClick: (action: string, seriesId: string) => void
};

const DatasetSeriesActions: React.FC<DataSetSeriesActionsProps> = ({ series }) => {

    const { toastSuccess, updateExistingToast } = useCustomToast();


    const options: DropdownOption[] = [
        {
            label: "View Metadata",
            action: (seriesId :string) => {
                console.log("View Metadata", seriesId);
            },
        },
        {
            label: "Download nii.gz",
            action: (seriesId :string) => {
                const id = toastSuccess("Download started", 60)
                exportSeriesToNifti(seriesId, true, (mb) => updateExistingToast(id, "Downloaded " + mb + " mb", 5))
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
                row={series}
            />
        </div>
    );
};


export default DatasetSeriesActions;

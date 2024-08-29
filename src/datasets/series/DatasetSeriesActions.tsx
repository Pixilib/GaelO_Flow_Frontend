import React from 'react';
import { Series } from '../../utils';

import DropdownButton from '../../ui/menu/DropDownButton';

interface DropdownOption {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    action: (row: Series) => void;
}

const options: DropdownOption[] = [
    {
        label: "View Metadata",
        action: (row: Series) => {
            console.log("View Metadata", row);
        },
    },
    {
        label: "Download nii",
        action: (row: Series) => {
            console.log("Download nii", row);
        },
    },
    {
        label: "Download nii.gz",
        action: (row: Series) => {
            console.log("Download nii.gz", row);
        },
    }
];

type DataSetSeriesActionsProps = {
    series: Series& { id: string };
    onActionClick: (action: string, seriesId: string) => void
};

const DatasetSeriesActions: React.FC<DataSetSeriesActionsProps> = ({ series }) => {
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

import React from 'react';
import { Series } from '../../utils';
import { Button } from '../../ui';
import { Colors } from '../../utils';
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

const DatasetSeriesActions: React.FC<DataSetSeriesActionsProps> = ({ series, onActionClick }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleDropdownAction = (actionLabel: string) => {
        onActionClick(actionLabel, series.id);
    };

    const dropdownOptions: DropdownOption[] = options.map(option => ({
        ...option,
        action: () => handleDropdownAction(option.label),
    }));

    return (
        <div onClick={handleClick}>
            <Button color={Colors.primary} onClick={() => handleDropdownAction("View in OHIF")}>
                View in OHIF
            </Button>
            <Button color={Colors.primary} onClick={() => handleDropdownAction("View in Stone")}>
                View in Stone
            </Button>
            <DropdownButton
                row={series}
                options={dropdownOptions}
                buttonText="Actions"
            />
        </div>
    );
};

export default DatasetSeriesActions;

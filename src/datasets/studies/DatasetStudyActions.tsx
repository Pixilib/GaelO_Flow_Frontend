import React from 'react';

import DropdownButton from '../../ui/menu/DropDownButton';
import Study from '../../model/Study';

interface DropdownOption {
    label: string;
    icon?: React.ReactNode;
    color?: string;
    action: (row: any) => void;
}
const options: DropdownOption[] = [
    {
        label: "View in OHIF",
        action: (row: any) => {
            console.log("View in OHIF", row);
        },
    },
    {
        label: "View in Stone",
        action: (row: any) => {
            console.log("View in Stone", row);
        },
    }
];

type DatasetStudyActionsProps = {
    study: Study,
    onActionClick: (actionType: string, studyId: string) => void
}

const DatasetStudyActions = ({ study, onActionClick }: DatasetStudyActionsProps) => {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleDropdownAction = (actionLabel: string) => {
        onActionClick(actionLabel, study.id);
    };

    const dropdownOptions: DropdownOption[] = options.map(option => ({
        ...option,
        action: () => handleDropdownAction(option.label),
    }));

    return (
        <div onClick={handleClick}>
            <DropdownButton
                row={study}
                options={dropdownOptions}
                buttonText="Actions"
            />
        </div>
    );
};

export default DatasetStudyActions;

import React from 'react';

import { Eye } from '../../icons';
import Study from '../../model/Study';

import OhifViewerLink from '../../content/OhifViewerLink';
import StoneViewerLink from '../../content/StoneViewerLink';
import DropdownButton from '../../ui/menu/DropdownButton';

type DatasetStudyActionsProps = {
    study: Study,
    onActionClick: (actionType: string, studyId: string) => void
}

const DatasetStudyActions = ({ study, onActionClick }: DatasetStudyActionsProps) => {

    const options = [
        {
            label: "View in OHIF",
            icon: <Eye />,
            color: 'green',
            component: <OhifViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            label: "View in Stone",
            icon: <Eye />,
            color: 'green',
            component: <StoneViewerLink studyInstanceUID={study.studyInstanceUID} />
        }
    ];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleDropdownAction = (actionLabel: string) => {
        onActionClick(actionLabel, study.id);
    };

    const dropdownOptions = options.map(option => ({
        ...option,
        action: () => handleDropdownAction(option.label),
    }));

    return (
        <div onClick={handleClick}>
            <DropdownButton
                options={dropdownOptions}
                buttonText="Actions"
            />
        </div>
    );
};

export default DatasetStudyActions;

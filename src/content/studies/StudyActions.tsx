// StudyActions.tsx
import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import { StudyMainDicomTags } from "../../utils/types";
import DropdownButton from '../../ui/menu/DropDownButton';

type StudyActionsProps = {
    study: StudyMainDicomTags & { id: string };
    onActionClick: (action: string, studyId: string) => void;
};

const StudyActions: React.FC<StudyActionsProps> = ({ study, onActionClick }) => {
    const options = [
        {
            label: 'Modify',
            icon: <FaEdit />,
            color: 'orange',
            action: () => onActionClick('edit', study.id)
        },
        {
            label: 'Delete',
            icon: <FaTrash />,
            color: 'red',
            action: () => onActionClick('delete', study.id)
        },
    ];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div onClick={handleClick}>
            <DropdownButton
                options={options}
                buttonText="Actions"
                row={study}
            />
        </div>
    );
};

export default StudyActions;
// StudyActions.tsx
import React from 'react';
import { FaEdit as EditIcon, FaEye as EyeIcon, FaTrash as TrashIcon } from "react-icons/fa";
import { GiBrain as BrainIcon } from 'react-icons/gi'
import { StudyMainDicomTags } from "../../utils/types";
import DropdownButton from '../../ui/menu/DropDownButton';
import OhifViewerLink from '../OhifViewerLink';
import StoneViewerLink from '../StoneViewerLink';

type StudyActionsProps = {
    study: StudyMainDicomTags & { id: string };
    onActionClick: (action: string, studyId: string) => void;
};

const StudyActions: React.FC<StudyActionsProps> = ({ study, onActionClick }) => {
    const options = [
        {
            label: '',
            icon: <EyeIcon />,
            color: 'green',
            component: <OhifViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            label: '',
            icon: <EyeIcon />,
            color: 'green',
            component: <StoneViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            label: 'Modify',
            icon: <EditIcon />,
            color: 'orange',
            action: () => onActionClick('edit', study.id)
        },
        {
            label: 'AI',
            icon: <BrainIcon />,
            color: 'green',
            action: () => onActionClick('ai', study.id)
        },
        {
            label: 'Preview Study',
            icon: <EyeIcon />,
            color: 'green',
            action: () => onActionClick('preview', study.id)
        },
        {
            label: 'Delete',
            icon: <TrashIcon />,
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
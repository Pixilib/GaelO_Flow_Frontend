// StudyActions.tsx
import React, { useState } from 'react';
import { Add, Brain, Cd, Download, Edit, Eye, Label, Trash } from '../../icons';
import { StudyMainDicomTags } from "../../utils/types";
import OhifViewerLink from '../OhifViewerLink';
import StoneViewerLink from '../StoneViewerLink';

import LabelModal from './LabelModal';
import { DropdownButton } from '../../ui';
import { useTranslation } from "react-i18next";

type StudyActionsProps = {
    study: StudyMainDicomTags & { id: string };
    onActionClick: (action: string, study: StudyMainDicomTags & { id: string }) => void;
};

const StudyActions: React.FC<StudyActionsProps> = ({ study, onActionClick }) => {
    const {t} = useTranslation()

    const [isLabelsModalOpen, setLabelsModalOpen] = useState(false);

    const options = [
        {
            label: '',
            icon: <Eye />,
            color: 'green',
            component: <OhifViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            label: '',
            icon: <Eye />,
            color: 'green',
            component: <StoneViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            label: 'Labels',
            icon: <Label />,
            color: 'bg-indigo-500',
            action: () => setLabelsModalOpen(true)
        },
        {
            label: t("contents.modify"),
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', study)
        },
        {
            label: t("contents.ai"),
            icon: <Brain />,
            color: 'green',
            action: () => onActionClick('ai', study)
        },
        {
            label: t("contents.create-serie"),
            icon: <Add />,
            color: 'green',
            action: () => onActionClick('createSerie', study)
        },
        {
            label: t("contents.preview-study"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', study)
        },
        {
            label: t("contents.download"),
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download', study)
        },
        {
            label: t("contents.send-to-burner"),
            icon: <Cd />,
            color: 'black',
            action: () => onActionClick('burn', study)
        },
        {
            label: t("contents.delete"),
            icon: <Trash />,
            color: 'red',
            action: () => onActionClick('delete', study)
        },
    ];

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div onClick={handleClick}>
            <DropdownButton
                data-gaelo-flow="study-actions"
                options={options}
                buttonText="Actions"
            />
            {isLabelsModalOpen && (
                <LabelModal
                    studyId={study.id}
                    show={isLabelsModalOpen}
                    onClose={() => setLabelsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default StudyActions;
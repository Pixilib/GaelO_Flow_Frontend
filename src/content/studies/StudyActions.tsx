// StudyActions.tsx
import React, { useState } from 'react';
import { Add, Brain, Download, Edit, Eye, Label, Trash } from '../../icons';
import { StudyMainDicomTags } from "../../utils/types";
import OhifViewerLink from '../OhifViewerLink';
import StoneViewerLink from '../StoneViewerLink';

import LabelModal from './LabelModal';
import { DropdownButton } from '../../ui';
import { useTranslation } from "react-i18next";

type StudyActionsProps = {
    study: StudyMainDicomTags & { id: string };
    onActionClick: (action: string, studyId: string) => void;
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
            action: () => onActionClick('edit', study.id)
        },
        {
            label: t("contents.ai"),
            icon: <Brain />,
            color: 'green',
            action: () => onActionClick('ai', study.id)
        },
        {
            label: t("contents.create-serie"),
            icon: <Add />,
            color: 'green',
            action: () => onActionClick('createSerie', study.id)
        },
        {
            label: t("contents.preview-study"),
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', study.id)
        },
        {
            label: t("contents.download"),
            icon: <Download />,
            color: 'green',
            action: () => onActionClick('download', study.id)
        },
        {
            label: t("contents.delete"),
            icon: <Trash />,
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
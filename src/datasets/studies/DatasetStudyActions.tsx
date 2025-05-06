import React from 'react';

import { Brain, Download, Edit, Eye } from '../../icons';

import OhifViewerLink from '../../content/OhifViewerLink';
import StoneViewerLink from '../../content/StoneViewerLink';
import DropdownButton from '../../ui/menu/DropdownButton';
import { Study, useCustomToast } from '../../utils';
import { exportRessource } from '../../services/export';

type DatasetStudyActionsProps = {
    study: Study,
    onActionClick: (actionType: string, studyId: string) => void
}

const DatasetStudyActions = ({ study, onActionClick }: DatasetStudyActionsProps) => {

        const { toastSuccess, updateExistingToast } = useCustomToast();

    const options = [
        {
            icon: <Download />,
            label: "Download DICOM",
            color: 'orange',
            action : () => {
                const id = toastSuccess("Download started", 30)
                exportRessource("studies", study.id, (mb) => {
                    updateExistingToast(id, "Downloaded " + mb + " mb", 10)})
            }
        },
        {
            icon: <Eye />,
            color: 'green',
            component: <OhifViewerLink studyInstanceUID={study.mainDicomTags.studyInstanceUID} />
        },
        {
            icon: <Eye />,
            color: 'green',
            component: <StoneViewerLink studyInstanceUID={study.mainDicomTags.studyInstanceUID} />
        },
        {
            label: 'Modify',
            icon: <Edit />,
            color: 'orange',
            action: () => onActionClick('edit', study.id)
        },
        {
            label: 'AI',
            icon: <Brain />,
            color: 'green',
            action: () => onActionClick('ai', study.id)
        },
        {
            label: 'Preview Study',
            icon: <Eye />,
            color: 'green',
            action: () => onActionClick('preview', study.id)
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
        </div>
    );
};

export default DatasetStudyActions;

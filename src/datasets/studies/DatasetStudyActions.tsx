import React from 'react';

import { Download, Eye } from '../../icons';

import OhifViewerLink from '../../content/OhifViewerLink';
import StoneViewerLink from '../../content/StoneViewerLink';
import DropdownButton from '../../ui/menu/DropdownButton';
import Study from '../../model/Study';
import { useCustomToast } from '../../utils';
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
            component: <OhifViewerLink studyInstanceUID={study.studyInstanceUID} />
        },
        {
            icon: <Eye />,
            color: 'green',
            component: <StoneViewerLink studyInstanceUID={study.studyInstanceUID} />
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
            />
        </div>
    );
};

export default DatasetStudyActions;

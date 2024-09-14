import React, { useMemo, useState } from 'react';
import { useCustomMutation } from '../../utils/reactQuery';
import { deleteStudy } from '../../services/orthanc';
import StudyTable from './StudyTable';
import EditStudy from './EditStudy';
import PreviewStudy from './PreviewStudy';
import { useConfirm } from '../../services/ConfirmContextProvider';
import { useCustomToast } from '../../utils/toastify';
import Patient from '../../model/Patient';
import AiStudy from './AiStudy';
import { exportRessource } from '../../services/export';

type StudyRootProps = {
    patient: Patient;
    onStudyUpdated: () => void;
    onStudySelected?: (studyId: string) => void;
}

const StudyRoot: React.FC<StudyRootProps> = ({ patient, onStudyUpdated, onStudySelected }) => {
    const [editingStudy, setEditingStudy] = useState<string | null>(null);
    const [aiStudyId, setAIStudyId] = useState<string | null>(null);
    const [previewStudyId, setPreviewStudyId] = useState<string | null>(null);

    const { confirm } = useConfirm();
    const { toastSuccess, toastError } = useCustomToast();

    const studies = useMemo(() => {
        return patient.getStudies().map(study => study.toJSON());
    }, [patient]);


    const { mutate: mutateDeleteStudy } = useCustomMutation<void, { id: string }>(
        ({ id }) => deleteStudy(id),
        [[]],
        {
            onSuccess: () => {
                toastSuccess('Study deleted successfully');
                onStudyUpdated();
            },
            onError: (error: any) => {
                toastError('Failed to delete study');
            },
        }
    );

    const handleRowClick = (studyId: string) => {
        onStudySelected && onStudySelected(studyId);
    }

    const handleDeleteStudy = async (studyId: string) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this study:
                <span className="text-xl not-italic font-bold text-primary">{studyId} ?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeleteStudy({ id: studyId });
        }
    };

    const handlePreviewStudy = (studyId: string) => {
        setPreviewStudyId(studyId);
    }

    const handleAIStudy = (studyId: string) => {
        setAIStudyId(studyId)
    }

    const handleDownloadStudy = (studyId: string) => {
        exportRessource('studies', studyId)
    }

    const handleStudyAction = (action: string, studyId: string) => {
        switch (action) {
            case 'edit':
                setEditingStudy(studyId);
                break;
            case 'delete':
                handleDeleteStudy(studyId);
                break;
            case 'preview':
                handlePreviewStudy(studyId);
                break;
            case 'ai':
                handleAIStudy(studyId);
                break;
            case 'download':
                handleDownloadStudy(studyId);
                break;
            default:
                break;
        }
    };


    const handleStudyEdit = () => {
        onStudyUpdated();
        setEditingStudy(null);
    };
    return (
        <div>
            <StudyTable
                studies={studies}
                onRowClick={handleRowClick}
                onActionClick={handleStudyAction}
            />
            {editingStudy && (
                <EditStudy
                    studyId={editingStudy}
                    onStudyUpdated={handleStudyEdit}
                    onClose={() => setEditingStudy(null)}
                    show={!!editingStudy}
                />
            )}
            {previewStudyId && (
                <PreviewStudy
                    studyId={previewStudyId}
                    onClose={() => setPreviewStudyId(null)}
                    show={!!previewStudyId}
                />
            )}
            {aiStudyId && (
                <AiStudy
                    studyId={aiStudyId}
                    onClose={() => setAIStudyId(null)}
                    show={!!aiStudyId}
                />
            )}
        </div>
    );
};

export default StudyRoot;
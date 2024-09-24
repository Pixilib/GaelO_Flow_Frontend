import React, { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useCustomMutation } from '../../utils/reactQuery';
import { useCustomToast } from '../../utils/toastify';
import { Colors } from '../../utils';
import { addStudyIdToDeleteList, addSeriesToExportList, addStudyIdToAnonymizeList } from '../../utils/actionsUtils';

import { deleteStudy } from '../../services/orthanc';
import { exportRessource } from '../../services/export';
import { useConfirm } from '../../services/ConfirmContextProvider';

import Patient from '../../model/Patient';

import StudyTable from './StudyTable';
import EditStudy from './EditStudy';
import PreviewStudy from './PreviewStudy';
import AiStudy from './AiStudy';

import Toolsbar from '../../ui/Toolsbar';
import { Button } from '../../ui';
import { addStudyToAnonymizeList } from '../../reducers/AnonymizeSlice';

import AnonIcon from '../../ui/AnonIcon';
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { FaFileExport as ExportIcon } from "react-icons/fa";

type StudyRootProps = {
    patient: Patient;
    onStudyUpdated: () => void;
    onStudySelected?: (studyId: string) => void;
};

const StudyRoot: React.FC<StudyRootProps> = ({ patient, onStudyUpdated, onStudySelected }) => {
    const dispatch = useDispatch();
    const [editingStudy, setEditingStudy] = useState<string | null>(null);
    const [aiStudyId, setAIStudyId] = useState<string | null>(null);
    const [previewStudyId, setPreviewStudyId] = useState<string | null>(null);
    const [selectedStudies, setSelectedStudies] = useState<{ [studyId: string]: boolean }>({});
    const [isToolsbarVisible, setIsToolsbarVisible] = useState(true);

    const { confirm } = useConfirm();
    const { toastSuccess, toastError, updateExistingToast } = useCustomToast();

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
            onError: () => {
                toastError('Failed to delete study');
            },
        }
    );

    const handleRowClick = (studyId: string) => {
        onStudySelected && onStudySelected(studyId);
    };

    const handleDeleteStudy = async (studyId: string) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this study:
                <span className="text-xl not-italic font-bold text-primary">{studyId}?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeleteStudy({ id: studyId });
        }
    };

    const handlePreviewStudy = (studyId: string) => {
        setPreviewStudyId(studyId);
    };

    const handleAIStudy = (studyId: string) => {
        setAIStudyId(studyId);
    };

    const handleDownloadStudy = (studyId: string) => {
        const id = toastSuccess("Download started, follow progression in console");
        exportRessource("studies", studyId, (mb) => updateExistingToast(id, `Downloaded ${mb} mb`));
    };

    const handleRowSelectionChange = (selectedState: { [studyId: string]: boolean }) => {
        setSelectedStudies(selectedState);
    };

    const handleSendDeleteList = async () => {
        const studyIds = Object.keys(selectedStudies);
        for (const studyId of studyIds) {
            await addStudyIdToDeleteList(studyId);
        }
    };

    const handleSendExportList = () => {
        const studyIds = Object.keys(selectedStudies);
        studyIds.forEach(studyId => {
            const series = studies.find(study => study.id === studyId);
            if (series) {
                dispatch(addSeriesToExportList({ series }));
            }
        });
    };

    const handleSendAnonymizeList = () => {
        const studyIds = Object.keys(selectedStudies);
        studyIds.forEach(studyId => {
            const series = studies.find(study => study.id === studyId);
            if (series) {
                dispatch(addStudyToAnonymizeList({ series }));
            }
        });
    };

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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <StudyTable
                    studies={studies}
                    onRowClick={handleRowClick}
                    onActionClick={handleStudyAction}
                    selectedRows={selectedStudies}
                    onRowSelectionChange={handleRowSelectionChange}
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

            {isToolsbarVisible && (
                <Toolsbar isSticky={true} className="sticky bottom-0 flex items-center justify-center w-full bg-white">
                    <Button
                        color={Colors.danger}
                        className="flex items-center mx-2 text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendDeleteList}
                    >
                        <DeleteIcon className="text-xl" />
                        <span className="ml-2">Send to delete</span>
                    </Button>

                    <Button
                        color={Colors.secondary}
                        className="flex items-center mx-2 text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendExportList}
                    >
                        <ExportIcon className="text-xl" />
                        <span className="ml-2">Send to Export</span>
                    </Button>

                    <Button // TODO: Add anonymize action
                        className="flex items-center mx-2 text-sm transition-transform duration-200 bg-blue-700 hover:scale-105"
                        onClick={handleSendAnonymizeList}>
                        <AnonIcon className="text-xl" onClick={undefined} />
                        <span className="ml-2">Send to Anonymize</span>
                    </Button>
                </Toolsbar>
            )}
        </div>
    );
};

export default StudyRoot;

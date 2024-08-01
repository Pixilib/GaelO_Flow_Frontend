/**
 * Component to edit a study with a modal and a form
 */

import React from "react";
import { Study, StudyPayload } from "../../utils/types";
import { getStudy, modifyStudy } from "../../services/orthanc";
import { useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import StudyEditForm from './StudyEditForm';
import { Modal, Spinner } from "../../ui";

type EditStudyProps = {
    studyId: string;
    onStudyUpdated: () => void;
    onClose: () => void;
    show: boolean;
}

const EditStudy: React.FC<EditStudyProps> = ({ studyId, onStudyUpdated, onClose, show }) => {
    const { toastSuccess, toastError } = useCustomToast();
    const { mutateAsync: mutateStudy } = useCustomMutation<any, { id: string, payload: StudyPayload }>(
        ({ id, payload }) => modifyStudy(id, payload),
        [['studies'], ['jobs']],
        {
            onSuccess: (data) => {
                toastSuccess(`Study ${data.id} updated successfully`);
                onStudyUpdated();
                onClose();
            },
            onError: (error) => {
                toastError("Failed to update study: " + error );
            },
        }
    );

    const { data: editingStudyDetails, isPending } = useCustomQuery<Study>(
        ['studies', studyId],
        () => getStudy(studyId) ,
        {
            onError: (error:any) => {
                toastError("Failed to load study details: " + error);
            },
        }
    );

    const handleSubmit = ({ id, payload }: { id: string; payload: StudyPayload }) => {
        mutateStudy({ id, payload });
    };

    if (isPending) return <Spinner/>

    return (
        <Modal
            size="xl"
            show={show}
        >
            <Modal.Header onClose={onClose}> Edit Study</Modal.Header>
            <Modal.Body>
            {editingStudyDetails && (
                    <StudyEditForm 
                        data={{...editingStudyDetails.mainDicomTags, id: editingStudyDetails.id}}
                        onSubmit={handleSubmit} 
                        onCancel={onClose} 
                    />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default EditStudy;
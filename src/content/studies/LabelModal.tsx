import React from "react";
import { Modal } from "../../ui";
import { useCustomMutation, useCustomQuery } from "../../utils";
import { addLabelForStudy, getLabelsOfStudy, removeLabelForStudy } from "../../services/orthanc";
import SelectLabels from "../SelectLabels";
type LabelModalProps = {
    studyId: string;
    onClose: () => void;
    show: boolean;
};

const LabelModal: React.FC<LabelModalProps> = ({ studyId, onClose, show }) => {

    const { data: existingLabelsOptions } = useCustomQuery<string[]>(
        ['study', studyId, 'labels'],
        () => getLabelsOfStudy(studyId),
    )

    const { mutate: mutateAddLabel } = useCustomMutation(
        ({ label }) => addLabelForStudy(studyId, label),
        [['study', studyId, 'labels']]
    )

    const { mutate: mutateDeleteLabel } = useCustomMutation(
        ({ label }) => removeLabelForStudy(studyId, label),
        [['study', studyId, 'labels']]
    )

    const handleLabelChanges = (labels: string[]) => {
        const labelsToAdd = labels.filter((label) => !existingLabelsOptions.some((existingLabel) => existingLabel === label))
        const labelsToRemove = existingLabelsOptions.filter((existingLabel) => !labels.some((label) => existingLabel === label))

        for(const label of labelsToAdd) {
            mutateAddLabel({ label })
        }
        for(const label of labelsToRemove) {
            mutateDeleteLabel({ label })
        }
    }
    return (
        <Modal show={show} size='lg'>
            <Modal.Header onClose={onClose}>Assign Labels</Modal.Header>
            <Modal.Body>
                <SelectLabels
                values={existingLabelsOptions} 
                onChange={handleLabelChanges} />
                <p>{studyId}</p>
            </Modal.Body>
        </Modal>
    );
};

export default LabelModal;

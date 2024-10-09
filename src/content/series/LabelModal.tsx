import React from "react";
import { Modal } from "../../ui";
import { Series } from "../../utils/types";

type LabelModalProps = {
    series: Series;
    onClose: () => void;
    show: boolean;
};

const LabelModal: React.FC<LabelModalProps> = ({ series, onClose, show }) => {
    return (
        <Modal show={show} size='lg'>
            <Modal.Header onClose={onClose}>Assign Labels</Modal.Header>
            <Modal.Body>
                <p>{series.id}</p>
            </Modal.Body>
        </Modal>
    );
};

export default LabelModal;

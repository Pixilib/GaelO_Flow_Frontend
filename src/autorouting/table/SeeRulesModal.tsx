import { Rule } from "../../utils/types";
import { Modal } from "../../ui";

type SeeRulesModalProps = {
    show: boolean;
    onClose: () => void;
    data: Rule[];
}

const SeeRulesModal = ({ show, onClose, data }: SeeRulesModalProps) => {
    return (
        <Modal
            show={show}
            onClose={onClose}
            size="xl"
        >
            <Modal.Header onClose={onClose}>
                <Modal.Title>Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-4 bg-gray-200 rounded-lg">
                    <pre className="text-sm break-all whitespace-pre-wrap">
                        {JSON.stringify(data)}
                    </pre>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default SeeRulesModal
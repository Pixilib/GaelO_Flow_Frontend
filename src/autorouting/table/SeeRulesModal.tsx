import { Rule } from "../../utils/types";
import { Modal, Table } from "../../ui";
import { Colors } from "../../utils";

type SeeRulesModalProps = {
    show: boolean;
    onClose: () => void;
    data: Rule[];
}

const SeeRulesModal = ({ show, onClose, data }: SeeRulesModalProps) => {

    const columns = [
        {
            header: "DicomTag",
            accessorKey: "DicomTag",
        },
        {
            header: "Condition",
            accessorKey: "Condition",
        },
        {
            header: "Value",
            accessorKey: "Value",
        }
    ];

    return (
        <Modal
            show={show}
            onClose={onClose}
            size="xl"
        >
            <Modal.Header onClose={onClose}>
                <Modal.Title>Rules</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light-gray dark:bg-inherit">
                <Table
                    columns={columns}
                    data={data}
                    enableSorting={false}
                />
            </Modal.Body>
            <Modal.Footer />
        </Modal>
    );
}

export default SeeRulesModal
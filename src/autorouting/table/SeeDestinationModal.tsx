import { Destination } from "../../utils/types";
import { Modal, Table } from "../../ui";

type SeeDestinationModalProps = {
    show: boolean;
    onClose: () => void;
    data: Destination[];
}

const SeeDestinationModal = ({ show, onClose, data }: SeeDestinationModalProps) => {
    const columns = [
        {
            header: "Name",
            accessorKey: "Name",
        },
        {
            header: "Destination",
            accessorKey: "Destination",
        },
    ];

    return (
        <Modal
            show={show}
            onClose={onClose}
            size="xl"
        >
            <Modal.Header onClose={onClose}>
                <Modal.Title>Destinations</Modal.Title>
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

export default SeeDestinationModal
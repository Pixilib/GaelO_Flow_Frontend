import React from 'react';
import { Modal, Table } from '../../ui';

interface ImportError {
    filename: string;
    errorMessage: string;
}

interface ImportErrorModalProps {
    errors: ImportError[];
    onClose: () => void;
}

const ImportErrorModal: React.FC<ImportErrorModalProps> = ({ errors, onClose }) => {
    console.log(errors);

    const columns = [
        {
            accessorKey: "filename",
            header: "Filename"
        },
        {
            accessorKey: "errorMessage",
            header: "Message"
        }
    ];

    return (
        <Modal show={true} size="lg" onClose={onClose}>
            <Modal.Header onClose={onClose}>
                <Modal.Title>Upload Errors</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table data={errors} columns={columns} />
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
                <button onClick={onClose} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md">
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportErrorModal;


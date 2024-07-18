import React from 'react';
import { Modal } from '../../ui';

interface ImportErrorModalProps {
    errors: { [filename: string]: string }[];
    onClose: () => void;
}

const ImportErrorModal: React.FC<ImportErrorModalProps> = ({ errors, onClose }) => {
    return (
        <Modal show={true} size="lg" onClose={onClose}>
            <Modal.Header onClose={onClose}>
                <Modal.Title>Fichiers avec erreurs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {errors.map((error, index) => {
                        const [filename, errorMessage] = Object.entries(error)[0];
                        return (
                            <li key={index}>
                                {filename}: {errorMessage}
                            </li>
                        );
                    })}
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md">
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImportErrorModal;

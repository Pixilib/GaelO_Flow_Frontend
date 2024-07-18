import React from 'react';
import FormModal from '../ui/FormModal';
import PatientEditForm from './PatientEditForm';
import Patient  from '../model/Patient';
import { PatientPayload } from "../utils/types";


type PatientEditModalProps = {
  patient: Patient;
  onSubmit: (patientId: string, payload: PatientPayload) => void;
  onClose: () => void;
  show: boolean;
}

const PatientEditModal: React.FC<PatientEditModalProps> = ({ patient, onSubmit, onClose, show }) => {
    
  const handleFormSubmit = (payload: PatientPayload,patientId: string)  => {
      onSubmit(patientId, payload);
      onClose();
  };

  return (
    <FormModal
      title="Edit Patient"
      onClose={onClose}
      show={show}
    >
      <PatientEditForm 
        patient={patient} 
        onSubmit={handleFormSubmit} 
        onCancel={onClose}
      />
    </FormModal>
  );
};

export default PatientEditModal;
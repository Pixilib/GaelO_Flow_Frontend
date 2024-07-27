import { useMemo, useState } from "react";
import { QueryPayload, useCustomMutation, useCustomQuery } from "../utils";
import { getLabels, modifyPatient, deletePatient } from "../services";
import { PatientPayload, OrthancResponse } from "../utils/types";
import Patient from "../model/Patient";
import { FormCard } from "../ui";
import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patient/AccordionPatient";
import { useConfirm } from "../services/ConfirmContextProvider";
import { useCustomToast } from "../utils/toastify";
import EditModal, { EditModalSubmitParams } from "../ui/EditModal";
import PatientEditForm from "./patient/PatientEditForm";
import { useContent } from "../services/useContent";

const ContentRoot = () => {
    const { model, executeSearch, isPending } = useContent();
    const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { confirm } = useConfirm();
    const { toastSuccess, toastError } = useCustomToast();

    const patients = useMemo(() => model?.getPatients() || [], [JSON.stringify(model)]);

    const { data: labelsData } = useCustomQuery<string[]>(['labels'], getLabels);

    const { mutate: mutatePatient } = useCustomMutation<OrthancResponse, { id: string, payload: PatientPayload }>(
        ({ id, payload }) => modifyPatient(id, payload),
        [['jobs']],
        {
            onSuccess: async(data) => {
                console.log("Patient updated successfully:", data);
                closeModal();
                toastSuccess("Patient updated successfully");
                await executeSearch();
            },
            onError: (error: any) => {
                console.error("Error updating patient:", error);
                toastError("Failed to update patient");
            }
        }
    );

    const { mutate: mutateDeletePatient } = useCustomMutation<void, string>(
        deletePatient,
        [['jobs']],
        {
            onSuccess: async (_, patientId) => {
                console.log("Patient deleted successfully:", patientId);
                toastSuccess("Patient deleted successfully");
                await executeSearch();
            },
            onError: (error: any) => {
                console.error("Error deleting patient:", error);
                toastError("Failed to delete patient");
            }
        }
    );

    const handleSubmit = (formData: QueryPayload) => executeSearch(formData);

    const handleEditSubmit = ({ id, payload }: EditModalSubmitParams<PatientPayload>) => mutatePatient({ id, payload });

    const handleEditPatient = (patient: Patient) => {
        setPatientToEdit(patient);
        setIsModalOpen(true);
    };

    const handleDeletePatient = async (patientId: string) => {
        const patient = model?.patients.find((p: Patient) => p.id === patientId);
        if (!patient) {
            toastError("Patient not found");
            return;
        }
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this patient:
                <span className="text-xl not-italic font-bold text-primary">{patient.id} {patient.patientName} ?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            mutateDeletePatient(patientId);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPatientToEdit(null);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <FormCard
                className="flex flex-col justify-center w-11/12 bg-white gap-y-2"
                title="Search"
                collapsible={true}
            >
                <SearchForm onSubmit={handleSubmit} labelsData={labelsData} withAets={true} />
            </FormCard>
            <div className="flex flex-col items-center w-full">
                <div className="mb-4 text-2xl font-bold text-primary">Results</div>
                <div className="w-11/12">
                    {isPending ? (
                        <div>Loading...</div>
                    ) : (
                        patients.map((patient: Patient) => (
                            <AccordionPatient
                                key={patient.id}
                                patient={patient}
                                onDeletePatient={handleDeletePatient}
                                onEditPatient={handleEditPatient}
                            />
                        ))
                    )}
                </div>
            </div>
            {isModalOpen && patientToEdit && (
                <EditModal<Patient, PatientPayload>
                    title="Edit Patient"
                    data={patientToEdit}
                    show={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleEditSubmit}
                    FormComponent={PatientEditForm}
                />
            )}
        </div>
    );
};

export default ContentRoot;
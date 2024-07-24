import { useMemo, useState } from "react";
import { QueryPayload, useCustomMutation, useCustomQuery } from "../utils";
import { getLabels, findTools, modifyPatient, deletePatient } from "../services";
import { PatientPayload, Study as StudyType, OrthancResponse, OrthancJob } from "../utils/types";
import Model from "../model/Model";
import Patient from "../model/Patient";
import { FormCard } from "../ui";
import SearchForm from "../query/SearchForm";
import AccordionPatient from "./patient/AccordionPatient";
import { useConfirm } from "../services/ConfirmContextProvider";
import { useCustomToast } from "../utils/toastify";
import EditModal, { EditModalSubmitParams } from "../ui/EditModal";
import PatientEditForm from "./patient/PatientEditForm";

const ContentRoot = () => {
    const [refModel, setRefModel] = useState<Model | null>(null);
    const [patientToEdit, setPatientToEdit] = useState<Patient | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobId, setJobId] = useState<string | null>(null);
    const { confirm } = useConfirm();
    const { toastSuccess, toastError } = useCustomToast();

    const patients = useMemo(() => {
        return refModel?.getPatients() || [];
    }, [JSON.stringify(refModel)]);

    const { data: labelsData } = useCustomQuery<string[]>(
        ['labels'],
        () => getLabels(),
    );

    const { mutateAsync: mutateTools } = useCustomMutation<StudyType[], any>(
        ({ formData }) => findTools(formData),
        [],
        {
            onSuccess: (data) => {
                const model = new Model();
                console.log("Data", data);
                data.forEach(studyData => {
                    model.addStudy(studyData);
                });
                setRefModel(model);
            },
            onError: (error: any) => {
                console.log("Error", error);
                toastError("Failed to fetch studies");
            }
        }
    );

    const { mutate: mutatePatient } = useCustomMutation<OrthancResponse, { id: string, payload: PatientPayload }>(
        ({ id, payload }) => modifyPatient(id, payload),
        [['jobs']],
        {
            onSuccess: (data) => {
                console.log("Patient updated successfully:", data);
                if (data.id) {
                    setJobId(data.id);
                }
                closeModal();
                toastSuccess("Patient updated successfully");
            },
            onError: (error: any) => {
                console.error("Error updating patient:", error);
                toastError("Failed to update patient");
            }
        }
    );

    const { mutate: mutateDeletePatient } = useCustomMutation<void, string>(
        (id) => deletePatient(id),
        [['jobs']],
        {
            onSuccess: (_, patientId) => {
                console.log("Patient deleted successfully:", patientId);
                if (refModel) {
                    const updatedPatients = refModel.patients.filter(p => p.id !== patientId);
                    const newModel = new Model();
                    newModel.patients = updatedPatients;
                    setRefModel(newModel);
                }
                toastSuccess("Patient deleted successfully");
            },
            onError: (error: any) => {
                console.error("Error deleting patient:", error);
                toastError("Failed to delete patient");
            }
        }
    );


    const handleSubmit = async (formData: QueryPayload) => {
        await mutateTools({ formData });
    };

    const handleEditSubmit = ({ id, payload }: EditModalSubmitParams<PatientPayload>) => {
        console.log("handleEditSubmit called with patientId:", id, "and payload:", payload);
        mutatePatient({ id, payload });
    };
    const handleEditPatient = (patient: Patient) => {
        console.log("Opening edit modal for patient:", patient.id);
        setPatientToEdit(patient);
        setIsModalOpen(true);
    };

    const handleDeletePatient = async (patientId: string) => {
        const patient = refModel?.patients.find(p => p.id === patientId);
        if (!patient) {
            console.error("Patient not found for deletion:", patientId);
            toastError("Patient not found");
            return;
        }
        console.log("Deleting patient:", patient.id);
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
        console.log("Closing modal");
        setIsModalOpen(false);
        setPatientToEdit(null);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <FormCard
                className="flex flex-col justify-center w-11/12 bg-white gap-y-2"
                title={"Search"}
                collapsible={true}
            >
                <SearchForm
                    onSubmit={handleSubmit}
                    labelsData={labelsData}
                    withAets={true}
                />
            </FormCard>
            <div className="flex flex-col items-center w-full">
                <div className="mb-4 text-2xl font-bold text-primary">Results</div>
                <div className="w-11/12">
                    {patients.map((patient) => (
                        <AccordionPatient
                            key={patient.id}
                            patient={patient}
                            onDeletePatient={(id) => {
                                console.log("onDeletePatient called from ContentRoot with id:", id);
                                handleDeletePatient(id);
                            }}
                            onEditPatient={handleEditPatient}
                        />
                    ))}
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

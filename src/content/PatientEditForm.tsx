import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Input, Label } from "../ui";
import Patient from "../model/Patient";
import { PatientMainDicomTags, PatientPayload } from "../utils/types";
import { BsTrashFill as Delete } from "react-icons/bs";
import CheckBox from "../ui/Checkbox";
import { Colors } from "../utils";

type PatientEditFormProps = {
    patient: Patient;
    onSubmit: (payload: PatientPayload, patientId: string,) => void;
    onCancel: () => void;
};

//TODO: NE faire appraitre les champs que si ils ne sont pas null
//!WIP
const PatientEditForm: React.FC<PatientEditFormProps> = ({ patient, onSubmit, onCancel }) => {
    const [patientId, setPatientId] = useState<string>(patient.id);
    const [patientName, setPatientName] = useState<string | null>(null);
    const [patientBirthDate, setPatientBirthDate] = useState<string | null>(null);
    const [patientSex, setPatientSex] = useState<string | null>(null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

    useEffect(() => {
        if (patient) {
            setPatientId(patient.id);
            setPatientName(patient.patientName);
            setPatientBirthDate(patient.patientBirthDate);
            setPatientSex(patient.patientSex);
        }
    }, [patient]);

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const replace: Partial<PatientMainDicomTags> = {};

        if (patientName !== patient.patientName) {
            replace.patientName = patientName;
        }
        if (patientBirthDate !== patient.patientBirthDate) {
            replace.patientBirthDate = patientBirthDate;
        }
        if (patientSex !== patient.patientSex) {
            replace.patientSex = patientSex;
        }

        if (patientId !== patient.patientId && patientId !== null) {
            replace.patientId = patientId;
        }

        const payload: PatientPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
        };
        console.log("PatientEditForm", payload);
        onSubmit(payload, patientId);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Patient ID" className="text-sm font-medium" />}
                        value={patient.id}
                        readOnly
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("patientId")}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("patientId", event.target.checked)}
                        bordered={false}
                    />
                </fieldset>
                <fieldset className="flex items-center space-x-1">
                    <Input
                        label={<Label value="Patient Name" className="text-sm font-medium" />}
                        placeholder="Enter patient name"
                        value={patientName ?? ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientName(event.target.value)}
                        required
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("patientName")}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("patientName", event.target.checked)}
                        bordered={false}
                    />
                </fieldset>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <fieldset className="flex items-center space-x-1">
                    <Input
                        label={<Label value="Patient Birth Date" className="text-sm font-medium" />}
                        placeholder="Enter patient birth date"
                        value={patientBirthDate ?? ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientBirthDate(event.target.value)}
                        required
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("patientBirthDate")}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("patientBirthDate", event.target.checked)}
                        bordered={false}
                    />
                </fieldset>
                <fieldset className="flex items-center space-x-1">
                    <Input
                        label={<Label value="Patient Sex" className="text-sm font-medium" />}
                        placeholder="Enter patient sex"
                        value={patientSex ?? ""}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setPatientSex(event.target.value)}
                        required
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("patientSex")}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("patientSex", event.target.checked)}
                        bordered={false}
                    />
                </fieldset>
            </div>
            <div className="grid justify-center grid-cols-1 lg:grid-cols-2">
                <CheckBox
                    label="Removing private tags"
                    checked={removePrivateTags}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setRemovePrivateTags(event.target.checked)}
                    bordered={false}
                />
                <CheckBox
                    label="Keep source"
                    checked={keepSource}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setKeepSource(event.target.checked)}
                    bordered={false}
                />
            </div>
            <div className="flex justify-center mt-4 space-x-4">
                <Button color={Colors.secondary} type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" color={Colors.success}>
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default PatientEditForm;
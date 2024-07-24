import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Spinner } from "../../ui";
import Patient from "../../model/Patient";
import { PatientMainDicomTags, PatientPayload } from "../../utils/types";
import CheckBox from "../../ui/Checkbox";
import { Colors } from "../../utils";
import { EditModalFormProps } from "../../ui/EditModal";
import InputWithDelete from "../../ui/InputWithDelete";

type PatientEditFormProps = EditModalFormProps<Patient, PatientPayload>;

const PatientEditForm: React.FC<PatientEditFormProps> = ({ data, onSubmit, onCancel }) => {
    const [patientId, setPatientId] = useState<string>("");
    const [patientName, setPatientName] = useState<string | null>(null);
    const [patientBirthDate, setPatientBirthDate] = useState<string | null>(null);
    const [patientSex, setPatientSex] = useState<string | null>(null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
    
    if (!data) return <Spinner/>;

    useEffect(() => {
        if (data) {
            setPatientId(data.id);
            setPatientName(data.patientName);
            setPatientBirthDate(data.patientBirthDate);
            setPatientSex(data.patientSex);
        }
    }, [data]);

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const replace: Partial<PatientMainDicomTags> = {};

        if (patientName !== data.patientName) replace.patientName = patientName;
        if (patientBirthDate !== data.patientBirthDate) replace.patientBirthDate = patientBirthDate;
        if (patientSex !== data.patientSex) replace.patientSex = patientSex;
        if (patientId !== data.patientId && patientId !== null) replace.patientId = patientId;

        const payload: PatientPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
        };
        console.log("PatientEditForm", payload);
        onSubmit({ id: patientId, payload });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Patient ID"
                    value={data.id}
                    onChange={() => {}} // Readonly field
                    onRemove={handleFieldRemoval}
                    fieldName="patientId"
                    fieldsToRemove={fieldsToRemove}
                    readOnly={true}
                />
                <InputWithDelete
                    label="Patient Name"
                    value={patientName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientName(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="patientName"
                    fieldsToRemove={fieldsToRemove}
                    required={true}
                    placeholder="Enter patient name"
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Patient Birth Date"
                    value={patientBirthDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientBirthDate(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="patientBirthDate"
                    fieldsToRemove={fieldsToRemove}
                    required={true}
                    placeholder="Enter patient birth date"
                />
                <InputWithDelete
                    label="Patient Sex"
                    value={patientSex}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientSex(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="patientSex"
                    fieldsToRemove={fieldsToRemove}
                    required={true}
                    placeholder="Enter patient sex"
                />
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
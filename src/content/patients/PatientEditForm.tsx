import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Input, Spinner } from "../../ui";
import Patient from "../../model/Patient";
import { PatientMainDicomTags, PatientPayload } from "../../utils/types";
import CheckBox from "../../ui/Checkbox";
import { Colors } from "../../utils";
import InputWithDelete from "../../ui/InputWithDelete";

type PatientEditFormProps = {
    patient: Patient;
    onSubmit: (data: { id: string; payload: PatientPayload }) => void;
    onCancel: () => void;
};

    const PatientEditForm = ({ patient, onSubmit, onCancel }: PatientEditFormProps) => {
        const [patientId, setPatientId] = useState<string>(patient?.patientId ?? "");
        const [patientName, setPatientName] = useState<string | null>(patient?.patientName ?? null);
        const [patientBirthDate, setPatientBirthDate] = useState<string | null>(patient?.patientBirthDate ?? null);
        const [patientSex, setPatientSex] = useState<string | null>(patient?.patientSex ?? null);
        const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
        const [keepSource, setKeepSource] = useState<boolean>(false);
        const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
        
        if (!patient) return <Spinner/>;
    
        const handleFieldRemoval = (field: string, checked: boolean) => {
            setFieldsToRemove((prev) =>
                checked ? [...prev, field] : prev.filter((item) => item !== field)
            );
        };
    
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const replace: Partial<PatientMainDicomTags> = {};
    
            if (patientName !== patient.patientName) replace.patientName = patientName;
            if (patientBirthDate !== patient.patientBirthDate) replace.patientBirthDate = patientBirthDate;
            if (patientSex !== patient.patientSex) replace.patientSex = patientSex;
    
            const payload: PatientPayload = {
                replace,
                remove: fieldsToRemove,
                removePrivateTags,
                keepSource,
                force: true,
                synchronous: false,
            };
            onSubmit({ id: patientId, payload });
        };
    

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <Input
                    label="Patient ID"
                    value={patientId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientId(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="patientId"
                    fieldsToRemove={fieldsToRemove}
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
                    placeholder="Enter patient birth date"
                />
                <InputWithDelete
                    label="Patient Sex"
                    value={patientSex}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientSex(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="patientSex"
                    fieldsToRemove={fieldsToRemove}
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
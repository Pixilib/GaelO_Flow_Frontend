import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Input, Spinner } from "../../ui";
import Patient from "../../model/Patient";
import { PatientMainDicomTags, PatientModifyPayload } from "../../utils/types";
import CheckBox from "../../ui/Checkbox";
import { Colors } from "../../utils";
import InputWithDelete from "../../ui/InputWithDelete";
import ProgressJob from "../../query/ProgressJob";

type PatientEditFormProps = {
    jobId: string | null;
    patient: Patient;
    onSubmit: (data: { id: string; payload: PatientModifyPayload }) => void;
    onJobCompleted: (jobStatus :string) => void;
};

const PatientEditForm = ({ patient, jobId, onSubmit, onJobCompleted }: PatientEditFormProps) => {
    const [patientId, setPatientId] = useState<string>(patient?.patientId ?? "");
    const [patientName, setPatientName] = useState<string | null>(patient?.patientName ?? null);
    const [patientBirthDate, setPatientBirthDate] = useState<string | null>(patient?.patientBirthDate ?? null);
    const [patientSex, setPatientSex] = useState<string | null>(patient?.patientSex ?? null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
    const [keepUIDs, setKeepUIDs] = useState(false)

    if (!patient) return <Spinner />;

    useEffect(() => {
        if (keepUIDs) setKeepSource(true)
    }, [keepUIDs])

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const replace: Partial<PatientMainDicomTags> = {};

        if (patientName !== patient.patientName) replace.patientName = patientName;
        if (patientId !== patient.patientId) replace.patientId = patientId;
        if (patientBirthDate !== patient.patientBirthDate) replace.patientBirthDate = patientBirthDate;
        if (patientSex !== patient.patientSex) replace.patientSex = patientSex;

        const payload: PatientModifyPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
            keep: keepUIDs ? ['StudyInstanceUID', 'SeriesInstanceUID', 'SOPInstanceUID'] : [],
        };
        onSubmit({ id: patient.id, payload });
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
            <div className="flex justify-around">
                <CheckBox
                    label="Remove private tags"
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
                <CheckBox
                    label="Keep UIDs"
                    checked={keepUIDs}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKeepUIDs(e.target.checked)}
                    bordered={false}
                />
            </div>
            <div className="flex justify-center">
                <Button type="submit" color={Colors.success}>
                    Save Changes
                </Button>
                {jobId &&
                    (
                        <div className="flex flex-col items-center justify-center">
                            <ProgressJob jobId={jobId} onJobCompleted={onJobCompleted} />
                        </div>
                    )
                }
            </div>
        </form>
    );
};

export default PatientEditForm;


import React, { ChangeEvent, useState } from "react";
import { StudyModifyPayload, StudyMainDicomTags, Study, PatientMainDicomTags } from '../../utils/types';
import { Button, CheckBox, Input, InputWithDelete } from "../../ui";
import EditCustomTagsTable from "../series/edition/EditCustomTagsTable"
import { customTags } from "../series/edition/CustomTags";

import ProgressJob from "../../query/ProgressJob";
import { Colors } from "../../utils";
import SelectTranscode from "../SelectTranscode";

type StudyEditFormProps = {
    data: Study;
    onSubmit: (params: { id: string; payload: StudyModifyPayload }) => void;
    jobId?: string;
    onJobCompleted?: (jobState: string) => void;
};

const StudyEditForm = ({ data, onSubmit, jobId, onJobCompleted }: StudyEditFormProps) => {
    const [patientName, setPatientName] = useState<string | null>(data?.patientMainDicomTags?.patientName ?? null);
    const [patientId, setPatientId] = useState<string | null>(data?.patientMainDicomTags?.patientId ?? null);
    const [patientBirthDate, setPatientBirthDate] = useState<string | null>(data?.patientMainDicomTags?.patientBirthDate ?? null);
    const [patientSex, setPatientSex] = useState<string | null>(data?.patientMainDicomTags?.patientSex ?? null);

    const [accessionNumber, setAccessionNumber] = useState<string | null>(data?.mainDicomTags?.accessionNumber ?? null);
    const [studyDate, setStudyDate] = useState<string | null>(data?.mainDicomTags?.studyDate ?? null);
    const [studyDescription, setStudyDescription] = useState<string | null>(data?.mainDicomTags?.studyDescription ?? null);
    const [studyTime, setStudyTime] = useState<string | null>(data?.mainDicomTags?.studyTime ?? null);
    const [studyId, setStudyId] = useState<string | null>(data?.mainDicomTags?.studyId ?? null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
    const [keepUIDs, setKeepUIDs] = useState(false)
    const [transferSyntax, setTrasferSyntax] = useState(null);
    const [customsTags, setCustomTags] = useState<customTags>({});

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleChangeCustomTags = (customTags: customTags) => {
        setCustomTags(customTags);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const replace: Partial<StudyMainDicomTags & PatientMainDicomTags> & { raw: { [key: string]: string | number } } = {
            raw: {}
        };
        let transcode = undefined;

        if (patientId !== data?.patientMainDicomTags?.patientId) replace.patientId = patientId;
        if (patientName !== data?.patientMainDicomTags?.patientName) replace.patientName = patientName;
        if (replace.patientId || replace.patientName) {
            replace.patientBirthDate = patientBirthDate;
            replace.patientSex = patientSex;
        }

        if (accessionNumber !== data?.mainDicomTags?.accessionNumber) replace.accessionNumber = accessionNumber;
        if (studyDate !== data?.mainDicomTags?.studyDate) replace.studyDate = studyDate;
        if (studyDescription !== data?.mainDicomTags?.studyDescription) replace.studyDescription = studyDescription;
        if (studyId !== data?.mainDicomTags?.studyId) replace.studyId = studyId;
        if (studyTime !== data?.mainDicomTags?.studyTime) replace.studyTime = studyTime;
        if (transferSyntax) transcode = transferSyntax;
        replace.raw = { ...customsTags };

        const payload: StudyModifyPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keep: keepUIDs ? ['StudyInstanceUID', 'SeriesInstanceUID', 'SOPInstanceUID'] : [],
            keepSource,
            force: true,
            synchronous: false,
            ...(transcode && transcode !== 'None') ? { transcode } : {},
        };

        console.log("payload", payload);
        onSubmit({ id: data.id, payload });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <Input
                    label="Patient Name"
                    value={patientName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientName(e.target.value)}
                    fieldName="patientName"
                />
                <Input
                    label="Patient ID"
                    value={patientId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientId(e.target.value)}
                    fieldName="patientID"
                />
                <Input
                    label="Patient Birthdate"
                    value={patientBirthDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientBirthDate(e.target.value)}
                    fieldName="patientBirthdate"
                />
                <Input
                    label="Patient Sex"
                    value={patientSex}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientSex(e.target.value)}
                    fieldName="patientSex"
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <SelectTranscode
                    transfetSyntax={transferSyntax}
                    setTrasferSyntax={setTrasferSyntax}
                />
                <InputWithDelete
                    label="Accession Number"
                    value={accessionNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAccessionNumber(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="accessionNumber"
                    fieldsToRemove={fieldsToRemove}
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Study Description"
                    value={studyDescription}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyDescription(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="studyDescription"
                    fieldsToRemove={fieldsToRemove}
                />
                <InputWithDelete
                    label="Study ID"
                    value={studyId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyId(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="studyId"
                    fieldsToRemove={fieldsToRemove}
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Study Time"
                    value={studyTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyTime(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="studyTime"
                    fieldsToRemove={fieldsToRemove}
                />
                <InputWithDelete
                    label="Study Date"
                    value={studyDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyDate(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="studyDate"
                    fieldsToRemove={fieldsToRemove}
                />
            </div>
            <div className="">
                <EditCustomTagsTable
                    customTags={customsTags}
                    onChange={handleChangeCustomTags} 
                />
            </div>
            <div className="flex justify-around">
                <CheckBox
                    label="Remove private tags"
                    checked={removePrivateTags}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRemovePrivateTags(e.target.checked)}
                    bordered={false}
                />
                <CheckBox
                    label="Keep source"
                    checked={keepSource}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKeepSource(e.target.checked)}
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
                <Button type="submit" color={Colors.primary}>Modify</Button>
            </div>
            {jobId && (
                <div className="flex flex-col items-center justify-center">
                    <ProgressJob jobId={jobId} onJobCompleted={onJobCompleted} />
                </div>
            )}
        </form>
    );
};

export default StudyEditForm;
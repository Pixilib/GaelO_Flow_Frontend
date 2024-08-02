

import React, { ChangeEvent, useState } from "react";
import { StudyPayload, StudyMainDicomTags } from '../../utils/types';
import { CheckBox, InputWithDelete } from "../../ui";

import ProgressJobs from "../../query/ProgressJobs";

type StudyEditFormProps = {
    data: StudyMainDicomTags & { id: string };
    onSubmit: (params: { id: string; payload: StudyPayload }) => void;
    jobId?: string;
    onJobCompleted?: (jobState: string) => void;
};

const StudyEditForm = ({ data, onSubmit, jobId, onJobCompleted }: StudyEditFormProps) => {
    const [accessionNumber, setAccessionNumber] = useState<string | null>(data?.accessionNumber ?? null);
    const [studyDate, setStudyDate] = useState<string | null>(data?.studyDate ?? null);
    const [studyDescription, setStudyDescription] = useState<string | null>(data?.studyDescription ?? null);
    const [studyTime, setStudyTime] = useState<string | null>(data?.studyTime ?? null);
    const [studyId, setStudyId] = useState<string | null>(data?.studyId ?? null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const replace: Partial<StudyMainDicomTags> = {};

        if (accessionNumber !== data.accessionNumber) replace.accessionNumber = accessionNumber;
        if (studyDate !== data.studyDate) replace.studyDate = studyDate;
        if (studyDescription !== data.studyDescription) replace.studyDescription = studyDescription;
        if (studyId !== data.studyId) replace.studyId = studyId;
        if (studyTime !== data.studyTime) replace.studyTime = studyTime;

        const payload: StudyPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
        };
        onSubmit({ id: data.id, payload });
    };


    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Accession Number"
                    value={accessionNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAccessionNumber(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="accessionNumber"
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
            </div>
            <div className="grid justify-center grid-cols-1 lg:grid-cols-2">
                <CheckBox
                    label="Removing private tags"
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
            </div>
            {jobId &&
                (
                    <div className="flex flex-col items-center justify-center">
                        <ProgressJobs jobId={jobId} onJobCompleted={onJobCompleted} />
                    </div>
                )
            }
        </form>
    );
};

export default StudyEditForm;
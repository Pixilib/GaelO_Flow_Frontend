

import React, { ChangeEvent, useState, useEffect } from "react";
import { Study, StudyPayload, StudyMainDicomTags } from '../../utils/types';
import { EditModalFormProps } from "../../ui/EditModal";
import InputWithDelete from "../../ui/InputWithDelete";
import CheckBox from "../../ui/Checkbox";
import FormJobsActions from "../FormJobsActions";

const StudyEditForm: React.FC<EditModalFormProps<Study, StudyPayload>> = ({ data, onSubmit, onCancel }) => {
    const [accessionNumber, setAccessionNumber] = useState<string | null>(null);
    const [studyDate, setStudyDate] = useState<string | null>(null);
    const [studyDescription, setStudyDescription] = useState<string | null>(null);
    const [studyId, setStudyId] = useState<string | null>(null);
    const [studyTime, setStudyTime] = useState<string | null>(null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);
    
    console.log('StudyEditForm rendering with data:', data);

    useEffect(() => {
        setAccessionNumber(data.mainDicomTags.accessionNumber || null);
        setStudyDate(data.mainDicomTags.studyDate || null);
        setStudyDescription(data.mainDicomTags.studyDescription || null);
        setStudyId(data.mainDicomTags.studyId || null);
        setStudyTime(data.mainDicomTags.studyTime || null);
    }, [data]);

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>| React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const replace: Partial<StudyMainDicomTags> = {};

        if (accessionNumber !== data.mainDicomTags.accessionNumber) replace.accessionNumber = accessionNumber;
        if (studyDate !== data.mainDicomTags.studyDate) replace.studyDate = studyDate;
        if (studyDescription !== data.mainDicomTags.studyDescription) replace.studyDescription = studyDescription;
        if (studyId !== data.mainDicomTags.studyId) replace.studyId = studyId;
        if (studyTime !== data.mainDicomTags.studyTime) replace.studyTime = studyTime;

        const payload: StudyPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
        };
        console.log('payload', payload, "data", data);
        onSubmit({id: data.id, payload});
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
            
            <FormJobsActions
                onCancel={onCancel}
                onSubmit={handleSubmit}
            />
        </form>
    );
};

export default StudyEditForm;
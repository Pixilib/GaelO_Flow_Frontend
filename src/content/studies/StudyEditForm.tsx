import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Input, Label, Spinner } from "../../ui";
import { Study, StudyPayload, StudyMainDicomTags } from '../../utils/types';
import { BsTrashFill as Delete } from "react-icons/bs";
import CheckBox from "../../ui/Checkbox";
import { Colors } from "../../utils";
import { EditModalFormProps } from "../../ui/EditModal";


const StudyEditForm: React.FC<EditModalFormProps<Study, StudyPayload>> = ({ data, onSubmit, onCancel }) => {
    const [accessionNumber, setAccessionNumber] = useState<string | null>(null);
    const [studyDate, setStudyDate] = useState<string | null>(null);
    const [studyDescription, setStudyDescription] = useState<string | null>(null);
    const [studyId, setStudyId] = useState<string | null>(null);
    const [studyTime, setStudyTime] = useState<string | null>(null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

    if(!data) return <Spinner />;
    console.log(data);
    useEffect(() => {
        if (data && data.mainDicomTags) {
            setAccessionNumber(data.mainDicomTags.accessionNumber || null);
            setStudyDate(data.mainDicomTags.studyDate || null);
            setStudyDescription(data.mainDicomTags.studyDescription || null);
            setStudyId(data.mainDicomTags.studyId || null);
            setStudyTime(data.mainDicomTags.studyTime || null);
        }
    }, [data]);

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

        onSubmit({id:data.id ,payload});
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Accession Number" className="text-sm font-medium" />}
                        value={accessionNumber || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setAccessionNumber(e.target.value)}
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("accessionNumber")}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("accessionNumber", e.target.checked)}
                        bordered={false}
                    />
                </fieldset>
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Study Date" className="text-sm font-medium" />}
                        value={studyDate || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyDate(e.target.value)}
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("studyDate")}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("studyDate", e.target.checked)}
                        bordered={false}
                    />
                </fieldset>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Study Description" className="text-sm font-medium" />}
                        value={studyDescription || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyDescription(e.target.value)}
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("studyDescription")}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("studyDescription", e.target.checked)}
                        bordered={false}
                    />
                </fieldset>
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Study ID" className="text-sm font-medium" />}
                        value={studyId || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyId(e.target.value)}
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("studyId")}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("studyId", e.target.checked)}
                        bordered={false}
                    />
                </fieldset>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <fieldset className="flex items-center space-x-2">
                    <Input
                        label={<Label value="Study Time" className="text-sm font-medium" />}
                        value={studyTime || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setStudyTime(e.target.value)}
                    />
                    <CheckBox
                        label={<Delete size={"1.3rem"} className="fill-danger" />}
                        checked={fieldsToRemove.includes("studyTime")}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleFieldRemoval("studyTime", e.target.checked)}
                        bordered={false}
                    />
                </fieldset>
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

export default StudyEditForm;
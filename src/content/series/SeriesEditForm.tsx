import React, { ChangeEvent, useState } from "react";
import { Series, SeriesPayload, SeriesMainDicomTags, OrthancJob } from '../../utils/types';
import { InputWithDelete, CheckBox } from "../../ui";

import FormJobsActions from "../FormJobsActions";

type SeriesEditFormProps = {
    data: Series;
    onSubmit: (data: { id: string; payload: SeriesPayload }) => void;
    onCancel: () => void;
    jobId?: string;
    onJobCompleted?: (jobState: string) => void;
}
const SeriesEditForm = ({ data, onSubmit, onCancel, jobId, onJobCompleted }: SeriesEditFormProps) => {
    const [manufacturer, setManufacturer] = useState<string | null>(data.mainDicomTags.manufacturer ?? null);
    const [modality, setModality] = useState<string | null>(data.mainDicomTags.modality ?? null);
    const [seriesDescription, setSeriesDescription] = useState<string | null>(data.mainDicomTags.seriesDescription ?? null);
    const [seriesNumber, setSeriesNumber] = useState<string | null>(data.mainDicomTags.seriesNumber?.toString() ?? null);
    const [seriesDate, setSeriesDate] = useState<string | null>(data.mainDicomTags.seriesDate ?? null);
    const [seriesTime, setSeriesTime] = useState<string | null>(data.mainDicomTags.seriesTime ?? null);
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
        const replace: Partial<SeriesMainDicomTags> = {};

        if (manufacturer !== data.mainDicomTags.manufacturer) replace.manufacturer = manufacturer;
        if (modality !== data.mainDicomTags.modality) replace.modality = modality;
        if (seriesDescription !== data.mainDicomTags.seriesDescription) replace.seriesDescription = seriesDescription;
        if (seriesNumber !== data.mainDicomTags.seriesNumber?.toString()) replace.seriesNumber = seriesNumber;
        if (seriesDate !== data.mainDicomTags.seriesDate) replace.seriesDate = seriesDate;
        if (seriesTime !== data.mainDicomTags.seriesTime) replace.seriesTime = seriesTime;

        const payload: SeriesPayload = {
            replace,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false,
        };

        onSubmit({id: data.id, payload});
    }
    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Manufacturer"
                    value={manufacturer}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setManufacturer(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="manufacturer"
                    fieldsToRemove={fieldsToRemove}
                />
                <InputWithDelete
                    label="Modality"
                    value={modality}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setModality(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="modality"
                    fieldsToRemove={fieldsToRemove}
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Series Description"
                    value={seriesDescription}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSeriesDescription(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="seriesDescription"
                    fieldsToRemove={fieldsToRemove}
                />
                <InputWithDelete
                    label="Series Number"
                    value={seriesNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSeriesNumber(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="seriesNumber"
                    fieldsToRemove={fieldsToRemove}
                />
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                <InputWithDelete
                    label="Series Date"
                    value={seriesDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSeriesDate(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="seriesDate"
                    fieldsToRemove={fieldsToRemove}
                />
                <InputWithDelete
                    label="Series Time"
                    value={seriesTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSeriesTime(e.target.value)}
                    onRemove={handleFieldRemoval}
                    fieldName="seriesTime"
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
                jobId={jobId}
                onJobCompleted={onJobCompleted}
            />
        </form>
    );
};

export default SeriesEditForm;
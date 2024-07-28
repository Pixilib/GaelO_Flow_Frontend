import React, { ChangeEvent, useState, useEffect } from "react";
import { Series, SeriesPayload, SeriesMainDicomTags } from '../../utils/types';
import { EditModalFormProps } from "../../ui/EditModal";
import InputWithDelete from "../../ui/InputWithDelete";
import CheckBox from "../../ui/Checkbox";
import FormJobsActions from "../FormJobsActions";

const SeriesEditForm: React.FC<EditModalFormProps<Series, SeriesPayload>> = ({ data, onSubmit, onCancel }) => {
    const [manufacturer, setManufacturer] = useState<string | null>(null);
    const [modality, setModality] = useState<string | null>(null);
    const [seriesDescription, setSeriesDescription] = useState<string | null>(null);
    const [seriesNumber, setSeriesNumber] = useState<string | null>(null);
    const [seriesDate, setSeriesDate] = useState<string | null>(null);
    const [seriesTime, setSeriesTime] = useState<string | null>(null);
    const [removePrivateTags, setRemovePrivateTags] = useState<boolean>(false);
    const [keepSource, setKeepSource] = useState<boolean>(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

    useEffect(() => {
        setManufacturer(data.mainDicomTags.manufacturer || null);
        setModality(data.mainDicomTags.modality || null);
        setSeriesDescription(data.mainDicomTags.seriesDescription || null);
        setSeriesNumber(data.mainDicomTags.seriesNumber?.toString() || null);
        setSeriesDate(data.mainDicomTags.seriesDate || null);
        setSeriesTime(data.mainDicomTags.seriesTime || null);
    }, [data]);

    const handleFieldRemoval = (field: string, checked: boolean) => {
        setFieldsToRemove((prev) =>
            checked ? [...prev, field] : prev.filter((item) => item !== field)
        );
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>| React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    };
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
            />
        </form>
    );
};

export default SeriesEditForm;
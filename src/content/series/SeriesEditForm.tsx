import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Spinner } from "../../ui";
import Checkbox from "../../ui/Checkbox";
import { Series, SeriesPayload, SeriesMainDicomTags } from '../../utils/types';
import { Colors } from "../../utils";
import { EditModalFormProps } from "../../ui/EditModal";
import InputWithDelete from "../../ui/InputWithDelete";

type SeriesEditFormProps = EditModalFormProps<Series, SeriesPayload>;

const SeriesEditForm: React.FC<SeriesEditFormProps> = ({ data, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Partial<{ [K in keyof SeriesMainDicomTags]: string | null }>>({});
    const [removePrivateTags, setRemovePrivateTags] = useState(false);
    const [keepSource, setKeepSource] = useState(false);
    const [fieldsToRemove, setFieldsToRemove] = useState<string[]>([]);

    useEffect(() => {
        if (data?.mainDicomTags) {
            setFormData(Object.fromEntries(
                Object.entries(data.mainDicomTags)
                    .filter(([_, value]) => value != null)
                    .map(([key, value]) => [key, value?.toString() ?? null])
            ));
        }
    }, [data]);

    if (!data) return <Spinner />;

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRemove = (field: string, checked: boolean) => {
        setFieldsToRemove(prev => checked ? [...prev, field] : prev.filter(f => f !== field));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: SeriesPayload = {
            replace: formData,
            remove: fieldsToRemove,
            removePrivateTags,
            keepSource,
            force: true,
            synchronous: false
        };
        onSubmit({ id: data.id, payload });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {Object.entries(formData).map(([field, value]) => (
                    <InputWithDelete
                        key={field}
                        label={field}
                        value={value ?? ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(field, e.target.value)}
                        onRemove={handleRemove}
                        fieldName={field}
                        fieldsToRemove={fieldsToRemove}
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Checkbox
                    label="Remove private tags"
                    checked={removePrivateTags}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRemovePrivateTags(e.target.checked)}
                    bordered={false}
                />
                <Checkbox
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

export default SeriesEditForm;
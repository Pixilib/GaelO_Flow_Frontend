import { Trash } from "../../../icons";
import { Colors } from "../../../utils";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { ChangeEvent } from "react";
import { customTags } from "./types";

type EditCustomTagTableProps = {
    customTags: customTags;
    onChange: (customTags: customTags) => void;
};

const EditCustomTagsTable = ({ customTags, onChange }: EditCustomTagTableProps) => {

    const addTag = () => {
        onChange({
            ...customTags,
            [""]: ""
        })
    };

    const handleValueChange = (tag: string, value: string) => {
        onChange({
            ...customTags,
            [tag]: value
        });
    };

    const handleKeyChange = (oldKey: string, newKey: string) => {
        const { [oldKey]: value, ...rest } = customTags;
        onChange({
            ...rest,
            [newKey]: value
        });
    };

    const handleRemoveTag = (tag: string) => {
        const newTags = { ...customTags };
        delete newTags[tag];
        onChange(newTags);
    };

    return (
        <div className="p-2 overflow-auto max-h-50 rounded-xl bg-light-gray">
            <div className="flex flex-col gap-5 justify-center items-center">
                {customTags && Object.entries(customTags).map(([tag, value]) => (
                    <div key={tag} className="flex w-full gap-10 items-center">
                        <Input
                            fieldName="key"
                            value={tag}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleKeyChange(tag, e.target.value)}
                            placeholder="Dicom Tag"
                            autoFocus
                        />
                        <p> = </p>
                        <Input
                            fieldName="value"
                            placeholder={"value"}
                            value={value}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleValueChange(tag, e.target.value)}
                        />
                        <div className="w-10">
                            <Trash onClick={() => handleRemoveTag(tag)} size={"1.3rem"} className="fill-danger cursor-pointer" />
                        </div>
                    </div>
                ))}
                <Button type="button" color={Colors.blueCustom} onClick={addTag}>Add a field</Button>
            </div>
        </div>
    );
};

export default EditCustomTagsTable;

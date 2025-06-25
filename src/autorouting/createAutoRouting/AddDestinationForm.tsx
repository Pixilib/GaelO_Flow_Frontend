import { Destination } from "../../utils/types";
import { Button, Input, SelectInput } from "../../ui";
import { autoRoutingDestinationTypeOptions } from "../types";
import { Colors } from "../../utils";
import { Trash } from "../../icons";

type AddDestinationFormProps = {
    value: Destination;
    id: string;
    onChange: (id: string, value: Destination) => void;
    onDelete: () => void;
}

const AddDestinationForm = ({ value, id, onChange, onDelete }: AddDestinationFormProps) => {
    return (
        <div className="flex gap-5 flex-row">
            <Input
                placeholder="Name"
                onChange={(e) => onChange(id, { ...value, Name: e.target.value })}
                value={value?.Name}
            />
            <SelectInput
                placeholder="Select Destination"
                options={autoRoutingDestinationTypeOptions}
                value={value?.Destination}
                onChange={(e: any) => onChange(id, { ...value, Destination: e.value })}
            />
            <Button
                color={Colors.danger}
                children={<Trash />}
                onClick={onDelete}
            />
        </div>
    );
}

export default AddDestinationForm;
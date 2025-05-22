import { Input, Label, SelectInput, Toggle } from "../../ui";
import { AutoRoutingPayload } from "../../utils/types";
import { eventOptions } from "../types";

type CreateAutoRoutingFormProps = {
    payload: AutoRoutingPayload
    onPayloadChange: (payload: AutoRoutingPayload) => void;
}

const CreateAutoRoutingForm = ({ payload, onPayloadChange }: CreateAutoRoutingFormProps) => {
    return (
        <div className="flex gap-5 flex-row">
            <div className="w-full">
                <Label value="Name *" />
                <Input
                    placeholder="Name"
                    onChange={(e) => onPayloadChange({ ...payload, Name: e.target.value })}
                    value={payload?.Name}
                />
            </div>
            <div className="w-full">
                <Label value="Event Type *" />
                <SelectInput
                    placeholder="Select option"
                    options={eventOptions}
                    value={payload?.EventType}
                    onChange={(e: any) => onPayloadChange({ ...payload, EventType: e.value })}
                />
            </div>
            <div className="w-50">
                <Label value="Activated *" />
                <Toggle
                    checked={payload?.Activated}
                    onChange={() => onPayloadChange({ ...payload, Activated: !payload.Activated })}
                />
            </div>
        </div>
    );
}

export default CreateAutoRoutingForm;
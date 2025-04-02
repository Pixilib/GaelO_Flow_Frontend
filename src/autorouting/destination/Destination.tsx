import { Button, Input, SelectInput } from "../../ui"
import { Colors } from "../../utils"
import { AutoRoutingDestinationType, DestinationRule } from "../types";

type DestinationProps = {
    id: number;
    destination: DestinationRule;
    onDelete: () => void;
    onChange: (destination: DestinationRule) => void;
}

const destinationOptions = [
    {
        label: AutoRoutingDestinationType.AET,
        value: AutoRoutingDestinationType.AET
    },
    {
        label: AutoRoutingDestinationType.TMTVJOB,
        value: AutoRoutingDestinationType.TMTVJOB
    },
    {
        label: AutoRoutingDestinationType.PEER,
        value: AutoRoutingDestinationType.PEER
    }
]

const Destination = ({ destination, onChange, onDelete }: DestinationProps) => {

    const handleOnChange = (key: string, value: string) => {
        const updatedDestination = { ...destination }
        updatedDestination[key] = value;
        onChange(updatedDestination)
    }

    return (
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Input
                value={destination.Name}
                onChange={(event) => handleOnChange('Name', event.target.value)} />
            <SelectInput
                options={destinationOptions}
                value={destination.Destination}
                onChange={(type: any) => { handleOnChange('Destination', type.value) }}
            />
            <Button color={Colors.danger} onClick={() => onDelete()}>-</Button>
        </div>
    )
}

export default Destination;
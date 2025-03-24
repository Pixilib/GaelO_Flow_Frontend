import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label } from "../../ui";
import {
    AutoRoutingRuleValueRepresentation,
    AutoRoutingRuleCondition,
} from "../types";

const AutoRoutingRuleForm = () => {

    const [patientName, setPatientName] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [valueRepresentation, setValueRepresentation] = useState<AutoRoutingRuleValueRepresentation>(AutoRoutingRuleValueRepresentation.STRING);
    const [condition, setCondition] = useState<AutoRoutingRuleCondition>(AutoRoutingRuleCondition.EQUALS);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPatientName(event.target.value);
    };

    const handleInputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleValueRepresentationChange = (option) => {
        setValueRepresentation(option.value);
    };

    const handleConditionChange = (option) => {
        setCondition(option.value);
    };

    const valueRepresentationOptions = [
        { label: "String", value: AutoRoutingRuleValueRepresentation.STRING },
        { label: "Number", value: AutoRoutingRuleValueRepresentation.NUMBER },
    ];

    const conditionOptions = [
        { label: "Equals", value: AutoRoutingRuleCondition.EQUALS },
        { label: "Different", value: AutoRoutingRuleCondition.DIFFERENT },
    ];

    return (
        <div>
            <Input
                label="PatientName :"
                placeholder="PatientName"
                value={patientName}
                onChange={handleInputChange}
            />
            <Label value="Value Representation" />
            <SelectInput
                value={valueRepresentation}
                onChange={handleValueRepresentationChange}
                options={valueRepresentationOptions}
            />
            <Input
                label="Value :"
                placeholder="Value"
                value={value}
                onChange={handleInputChangeValue}
            />
            <Label value="Condition" />
            <SelectInput
                value={condition}
                onChange={handleConditionChange}
                options={conditionOptions}
            />
        </div>
    );
};

export default AutoRoutingRuleForm;

import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
    AutoroutingEventType,
    AutoRoutingRule,
    Destination,
    RuleCondition,
    AutoRoutingRuleFormType,
    AutoRoutingRuleValueRepresentation,
    AutoRoutingRuleDicomTag,
    AutoRoutingRuleCondition,
} from "./types";
import { Colors } from "../utils";

const AutoRoutingRuleForm = () => {
    const [PatientName, setPatientName] = useState<string>("");
    const [Value, setValue] = useState<string>("");
    const [ValueRepresentation, setValueRepresentation] = useState<AutoRoutingRuleValueRepresentation>(AutoRoutingRuleValueRepresentation.STRING);
    const [Condition, setCondition] = useState<AutoRoutingRuleCondition>(AutoRoutingRuleCondition.EQUALS);

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
        { label: "Not Equals", value: AutoRoutingRuleCondition.NOT_EQUALS },
    ];

    return (
        <div>
            <Input
                label="PatientName :"
                placeholder="PatientName"
                value={PatientName}
                onChange={handleInputChange}
            />

            <Label value="Value Representation" />
            <SelectInput
                value={ValueRepresentation}
                onChange={handleValueRepresentationChange}
                options={valueRepresentationOptions}
            />

            <Input
                label="Value :"
                placeholder="Value"
                value={Value}
                onChange={handleInputChangeValue}
            />

            <Label value="Condition" />
            <SelectInput
                value={Condition}
                onChange={handleConditionChange}
                options={conditionOptions}
            />
        </div>
    );
};

export default AutoRoutingRuleForm;

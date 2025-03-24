import { Input, SelectInput, Button } from "../../ui";
import { Colors } from "../../utils";
import {
    AutoRoutingRuleValueRepresentation,
    AutoRoutingRuleCondition,
    AutoRoutingRule
} from "../types";

type AutoRoutingRuleFormProps = {
    rule: AutoRoutingRule;
    onChange: (rule: AutoRoutingRule) => void;
    onDelete: () => void;
};

const valueRepresentationOptions = [
    { label: "String", value: AutoRoutingRuleValueRepresentation.STRING },
    { label: "Number", value: AutoRoutingRuleValueRepresentation.NUMBER },
];

const conditionOptions = [
    { label: "Equals", value: AutoRoutingRuleCondition.EQUALS },
    { label: "Different", value: AutoRoutingRuleCondition.DIFFERENT },
];

const AutoRoutingRuleForm = ({ rule, onChange, onDelete }: AutoRoutingRuleFormProps) => {
    const handleOnChange = (key: keyof AutoRoutingRule, value: any) => {
        const updatedRule = { ...rule, [key]: value };
        onChange(updatedRule);
    };

    return (
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Input
                placeholder="PatientName"
                value={rule.PatientName}
                onChange={(event) => handleOnChange("PatientName", event.target.value)}
            />
            <SelectInput
                options={valueRepresentationOptions}
                value={rule.ValueRepresentation}
                onChange={(option: any) => handleOnChange("ValueRepresentation", option.value)}
            />
            <Input
                placeholder="Value"
                value={rule.Value}
                onChange={(event) => handleOnChange("Value", event.target.value)}
            />
            <SelectInput
                options={conditionOptions}
                value={rule.Condition}
                onChange={(option: any) => handleOnChange("Condition", option.value)}
            />
            <Button color={Colors.danger} onClick={onDelete}>-</Button>
        </div>
    );
};

export default AutoRoutingRuleForm;
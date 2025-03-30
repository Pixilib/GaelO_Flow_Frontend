import React from 'react';
import { Button, Input, SelectInput } from "../../ui";
import { Colors } from "../../utils";

type RuleType = {
    id: number;
    dicomTag: string;
    valueRepresentation: string;
    value: string;
    condition: string;
};

type RuleProps = {
    rule: RuleType;
    onDelete: () => void;
    onChange: (rule: RuleType) => void;
};

const valueRepresentationOptions = [
    { label: 'String', value: 'string' },
    { label: 'Number', value: 'number' }
];

const conditionOptions = [
    { label: 'EQUALS', value: 'EQUALS' }
];

const Rule = ({ rule, onChange, onDelete }: RuleProps) => {

    const handleOnChange = (key: string, value: string) => {
        const updatedRule = { ...rule };
        updatedRule[key] = value;
        onChange(updatedRule);
    };

    return (
        <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <Input
                value={rule.dicomTag}
                placeholder="Patient Name"
                onChange={(event) => handleOnChange('dicomTag', event.target.value)}
            />
            <SelectInput
                options={valueRepresentationOptions}
                value={rule.valueRepresentation}
                onChange={(type: any) => handleOnChange('valueRepresentation', type.value)}
            />
            <Input
                value={rule.value}
                onChange={(event) => handleOnChange('value', event.target.value)}
            />
            <SelectInput
                options={conditionOptions}
                value={rule.condition}
                onChange={(type: any) => handleOnChange('condition', type.value)}
            />
            <Button color={Colors.danger} onClick={() => onDelete()}>-</Button>
        </div>
    );
};

export default Rule;

import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
    AutoroutingEventType,
    AutoRoutingRule,
    Destination,
    RuleCondition,
    AutoRoutingRuleFormType,
    AutoRoutingDestinationFormType,
} from "./types";
import { Colors } from "../utils";

const AutoRoutingRuleForm = () => {
    const [rules, setRules] = useState<AutoRoutingRule[]>([]);

    const addRule = () => {
        setRules([...rules, {
            condition: RuleCondition.EQUALS,
            value: "",
        }]);
    };

    const updateRule = (index: number, key: keyof AutoRoutingRule, value: any) => {
        setRules(rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule)));
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    const saveRules = async () => {
        const payload = { rules };

        try {
            const response = await fetch("https://api.example.com/rules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                alert("Rules saved successfully!");
            } else {
                alert("Failed to save rules.");
            }
        } catch (error) {
            alert("An error occurred while saving the rules.");
        }
    };

    return (
        <div>
            <Label value="Rules" />
            <Button color={Colors.primary} onClick={addRule}>+</Button>
            {rules.map((rule, index) => (
                <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
                    <SelectInput
                        value={rule.condition}
                        onChange={(e) => updateRule(index, "condition", e.value)}
                        options={Object.values(RuleCondition).map((value) => ({ label: value, value }))}
                    />
                    <Input
                        placeholder="Value"
                        value={rule.value}
                        onChange={(e) => updateRule(index, "value", e.target.value)}
                    />
                    <Button color={Colors.danger} onClick={() => removeRule(index)}>-</Button>
                </div>
            ))}
            <Button color={Colors.primary} onClick={saveRules}>Save Rules</Button>
        </div>
    );
};

export default AutoRoutingRuleForm;

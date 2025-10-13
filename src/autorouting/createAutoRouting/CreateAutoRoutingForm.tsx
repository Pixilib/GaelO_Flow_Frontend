import { Button, Input, Label, SelectInput, Toggle } from "../../ui";
import { AutoRoutingPayload, Destination, Rule } from "../../utils/types";
import { autoRoutingConditionOptions, eventOptions } from "../types";
import AddRuleForm from "./AddRuleForm";
import { Colors } from "../../utils";
import { Add } from "../../icons";
import AddDestinationForm from "./AddDestinationForm";
import { useTranslation } from "react-i18next";

type CreateAutoRoutingFormProps = {
    payload: AutoRoutingPayload
    onPayloadChange: (payload: AutoRoutingPayload) => void;
    rules: { rule: Rule, id: string }[];
    onRulesChange: (rules: { rule: Rule, id: string }[]) => void;
    destinations: { destination: Destination, id: string }[];
    onDestinationsChange: (destinations: { destination: Destination, id: string }[]) => void;
}

const CreateAutoRoutingForm = ({ payload, onPayloadChange, rules, onRulesChange, destinations, onDestinationsChange }: CreateAutoRoutingFormProps) => {

    const handleAddRule = () => {
        const newRule: Rule = {
            DicomTag: "",
            ValueRepresentation: "",
            Value: "",
            Condition: ""
        };
        onRulesChange([...rules, { rule: newRule, id: crypto.randomUUID() }]);
    }

    const handleModifyRule = (id: string, rule: Rule) => {
        onRulesChange(rules.map(r => r.id === id ? { rule, id } : r));
    }

    const handleAddDestination = () => {
        const newDestination: Destination = {
            Destination: "",
            Name: "",
        };
        onDestinationsChange([...destinations, { destination: newDestination, id: crypto.randomUUID() }]);
    }

    const handleModifyDestination = (id: string, destination: Destination) => {
        onDestinationsChange(destinations.map(d => d.id === id ? { destination, id } : d));
    }
    const {t} = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-5 flex-row">
                <div data-gaelo-flow="modal-name" className="w-full">
                    <Label value={t("autorouting.createAutoRooting.name*")}/>
                    <Input
                        placeholder={t("autorouting.createAutoRooting.name")}
                        onChange={(e) => onPayloadChange({ ...payload, Name: e.target.value })}
                        value={payload?.Name}
                    />
                </div>
                <div data-gaelo-flow="modal-eventype" className="w-full">
                    <Label value={t("autorouting.createAutoRooting.event-type*")} />
                    <SelectInput
                        placeholder="Select option"
                        options={eventOptions}
                        value={payload?.EventType}
                        onChange={(e: any) => onPayloadChange({ ...payload, EventType: e.value })}
                    />
                </div>
                <div className="w-50">
                    <Label value={t("autorouting.createAutoRooting.activated*")} />
                    <Toggle
                        checked={payload?.Activated}
                        onChange={() => onPayloadChange({ ...payload, Activated: !payload.Activated })}
                    />
                </div>
            </div>
            <div className="border-b border-gray-custom" />
            <div>
                <div className="flex flex-col gap-5">
                    <div data-gaelo-flow="modal-rules" className="flex items-center gap-10">
                        <h1 className="font-bold">{t("autorouting.createAutoRooting.rules")}</h1>
                        <div className="w-80">
                            <SelectInput
                                placeholder={t("autorouting.createAutoRooting.select-condition")}
                                options={autoRoutingConditionOptions}
                                value={payload?.Router?.RuleCondition || ""}
                                onChange={(e: any) => onPayloadChange({ ...payload, Router: { ...payload.Router, RuleCondition: e.value } })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {rules.map((rule, i) => (
                            <AddRuleForm
                                data-gaelo-flow="modal-ruleFields"
                                rule={rule.rule}
                                id={rule.id}
                                onChange={handleModifyRule}
                                onDelete={() => onRulesChange(rules.filter(r => r.id !== rule.id))}
                            />
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            color={Colors.primary}
                            onClick={handleAddRule}
                            children={
                                <div data-gaelo-flow="modal-addRule" className="flex items-center gap-2 text-sm">
                                    <Add />
                                    <p>{t("autorouting.createAutoRooting.add-rule")}</p>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-custom" />
            <div>
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold">{t("autorouting.createAutoRooting.destinations")}</h1>
                    <div>
                        <div className="flex flex-col gap-2">
                            {destinations.map((destination, i) => (
                                <AddDestinationForm
                                    data-gaelo-flow="modal-destinationFields"
                                    value={destination.destination}
                                    id={destination.id}
                                    onChange={handleModifyDestination}
                                    onDelete={() => onDestinationsChange(destinations.filter(d => d.id !== destination.id))}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            color={Colors.primary}
                            onClick={handleAddDestination}
                            children={
                                <div data-gaelo-flow="modal-addDestination" className="flex items-center gap-2 text-sm">
                                    <Add />
                                    <p>{t("autorouting.createAutoRooting.add-destination")}</p>
                                </div>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAutoRoutingForm;


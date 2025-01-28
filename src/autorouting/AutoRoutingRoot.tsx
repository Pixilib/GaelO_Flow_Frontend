import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
  AutoroutingEventType,
  AutoRoutingCondition,
  AutoRoutingRuleCondition,
  AutoRoutingRuleValueRepresentation,
  AutoRoutingRuleDicomTag,
  AutoRoutingRule,
  AutoRoutingDestinationType,
} from "./types";
import { Colors } from "../utils";

const AutoRoutingRoot = () => {
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<AutoroutingEventType | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState<AutoRoutingCondition>(
    AutoRoutingCondition.AND
  );

  const [rules, setRules] = useState<AutoRoutingRule[]>([]);
  const [destinations, setDestinations] = useState<
    { Destination: AutoRoutingDestinationType; Name: string }[]
  >([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEventTypeChange = (selectedOptions: any) => {
    setEventType(selectedOptions.value);
  };

  const handleSwitchChange = () => {
    setIsActivated(!isActivated);
  };

  const handleConditionChange = (option) => {
    setCondition(option.value);
  };

  // Gestion des rules
  const addRule = () => {
    setRules((prev) => [
      ...prev,
      {
        DicomTag: AutoRoutingRuleDicomTag.PATIENT_NAME,
        ValueRepresentation: AutoRoutingRuleValueRepresentation.STRING,
        Value: "",
        Condition: AutoRoutingRuleCondition.EQUALS,
      },
    ]);
  };

  const updateRule = (index: number, key: keyof AutoRoutingRule, value: any) => {
    setRules((prev) =>
      prev.map((rule, i) =>
        i === index ? { ...rule, [key]: value } : rule
      )
    );
  };

  const removeRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  // Gestion des destinations
  const addDestination = () => {
    setDestinations((prev) => [
      ...prev,
      { Destination: AutoRoutingDestinationType.AET, Name: "" },
    ]);
  };

  const updateDestination = (
    index: number,
    key: keyof { Destination: AutoRoutingDestinationType; Name: string },
    value: any
  ) => {
    setDestinations((prev) =>
      prev.map((destination, i) =>
        i === index ? { ...destination, [key]: value } : destination
      )
    );
  };

  const removeDestination = (index: number) => {
    setDestinations((prev) => prev.filter((_, i) => i !== index));
  };

  const sendForm = () => {
    console.log({
      name,
      eventType,
      isActivated,
      condition,
      rules,
      destinations,
    });
    alert("Form submitted! Check the console for details.");
  };

  return (
    <div>
      <Input
        label="Name :"
        placeholder="Name"
        value={name}
        onChange={handleInputChange}
      />
      <Label value="Event Type :" htmlFor="eventTypeSelect" />
      <SelectInput
        value={eventType}
        onChange={handleEventTypeChange}
        options={Object.values(AutoroutingEventType).map((value) => ({
          label: value,
          value,
        }))}
      />
      <Label value="Activated :" htmlFor="activatedSwitch" />
      <Input type="checkbox" checked={isActivated} onChange={handleSwitchChange} />
      <Label value="Condition :" htmlFor="conditionSelect" />
      <SelectInput
        onChange={handleConditionChange}
        value={condition}
        options={Object.values(AutoRoutingCondition).map((value) => ({
          label: value,
          value,
        }))}
      />

      {/* Gestion des rules */}
      <Label value="Rules" htmlFor="Rules" />
      <Button color={Colors.primary} onClick={addRule}>
        +
      </Button>
      {rules.map((rule, index) => (
        <div key={index} style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <SelectInput
            value={rule.DicomTag}
            onChange={(e) => updateRule(index, "DicomTag", e.value)}
            options={Object.values(AutoRoutingRuleDicomTag).map((value) => ({
              label: value,
              value,
            }))}
          />
          <SelectInput
            value={rule.ValueRepresentation}
            onChange={(e) =>
              updateRule(index, "ValueRepresentation", e.value)
            }
            options={Object.values(AutoRoutingRuleValueRepresentation).map(
              (value) => ({
                label: value,
                value,
              })
            )}
          />
          <SelectInput
            value={rule.Condition}
            onChange={(e) => updateRule(index, "Condition", e.value)}
            options={Object.values(AutoRoutingRuleCondition).map((value) => ({
              label: value,
              value,
            }))}
          />
          <Input
            placeholder="Value"
            value={rule.Value.toString()}
            onChange={(e) => updateRule(index, "Value", e.target.value)}
          />
          <Button
            color={Colors.danger}
            onClick={() => removeRule(index)}
            style={{ marginLeft: "10px" }}
          >
            -
          </Button>
        </div>
      ))}

      {/* Gestion des destinations */}
      <Label value="Destinations" htmlFor="Destinations" />
      <Button color={Colors.primary} onClick={addDestination}>
        +
      </Button>
      {destinations.map((destination, index) => (
        <div
          key={index}
          style={{ marginTop: "10px", display: "flex", gap: "10px" }}
        >
          <SelectInput
            value={destination.Destination}
            onChange={(e) => updateDestination(index, "Destination", e.value)}
            options={Object.values(AutoRoutingDestinationType).map((value) => ({
              label: value,
              value,
            }))}
          />
          <Input
            placeholder="Name"
            value={destination.Name}
            onChange={(e) => updateDestination(index, "Name", e.target.value)}
          />
          <Button
            color={Colors.danger}
            onClick={() => removeDestination(index)}
            style={{ marginLeft: "10px" }}
          >
            -
          </Button>
        </div>
      ))}

      <Button color={Colors.primary} onClick={sendForm}>
        Add
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

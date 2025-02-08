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
import { Trash } from "../icons";

const AutoRoutingRoot = () => {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState(AutoRoutingCondition.AND);
  const [rules, setRules] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const handleInputChange = (event) => setName(event.target.value);
  const handleEventTypeChange = (selectedOptions) => setEventType(selectedOptions.value);
  const handleSwitchChange = () => setIsActivated(!isActivated);
  const handleConditionChange = (option) => setCondition(option.value);

  const addRule = () => {
    setRules([...rules, {
      DicomTag: AutoRoutingRuleDicomTag.PATIENT_NAME,
      ValueRepresentation: AutoRoutingRuleValueRepresentation.STRING,
      Value: "",
      Condition: AutoRoutingRuleCondition.EQUALS,
    }]);
  };

  const updateRule = (index, key, value) => {
    setRules(rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule)));
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const addDestination = () => {
    setDestinations([...destinations, { Destination: AutoRoutingDestinationType.AET, Name: "" }]);
  };

  const updateDestination = (index, key, value) => {
    setDestinations(destinations.map((dest, i) => (i === index ? { ...dest, [key]: value } : dest)));
  };

  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  const sendForm = () => {
    console.log({ name, eventType, isActivated, condition, rules, destinations });
    alert("Form submitted! Check the console for details.");
  };

  return (
    <div className="flex flex-col gap-3" >
      <Input label="Name" placeholder="Name" value={name} onChange={handleInputChange} />
      <div className="flex gap-3">
        <Label value="Event Type" />
        <SelectInput
          value={eventType}
          onChange={handleEventTypeChange}
          options={Object.values(AutoroutingEventType).map((value) => ({ label: value, value }))}
        />
      </div>

      <div className="flex gap-3">
        <Input label="Activated" type="checkbox" checked={isActivated} onChange={handleSwitchChange} />
      </div>
      <div className="flex gap-3">
      <Label value="Condition" />
      <SelectInput
        onChange={handleConditionChange}
        value={condition}
        options={Object.values(AutoRoutingCondition).map((value) => ({ label: value, value }))}
      />
      </div>

      <Label value="Rules" />
      <Button color={Colors.primary} onClick={addRule}>+</Button>
      {rules.map((rule, index) => (
        <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <SelectInput
            value={rule.DicomTag}
            onChange={(e) => updateRule(index, "DicomTag", e.value)}
            options={Object.values(AutoRoutingRuleDicomTag).map((value) => ({ label: value, value }))}
          />
          <SelectInput
            value={rule.ValueRepresentation}
            onChange={(e) => updateRule(index, "ValueRepresentation", e.value)}
            options={Object.values(AutoRoutingRuleValueRepresentation).map((value) => ({ label: value, value }))}
          />
          <SelectInput
            value={rule.Condition}
            onChange={(e) => updateRule(index, "Condition", e.value)}
            options={Object.values(AutoRoutingRuleCondition).map((value) => ({ label: value, value }))}
          />
          <Input placeholder="Value" value={rule.Value} onChange={(e) => updateRule(index, "Value", e.target.value)} />
          <Button color={Colors.danger} onClick={() => removeRule(index)}><Trash/></Button>
        </div>
      ))}

      <Label value="Destinations" />
      <Button color={Colors.primary} onClick={addDestination}>+</Button>
      {destinations.map((destination, index) => (
        <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <SelectInput
            value={destination.Destination}
            onChange={(e) => updateDestination(index, "Destination", e.value)}
            options={Object.values(AutoRoutingDestinationType).map((value) => ({ label: value, value }))}
          />
          <Input placeholder="Name" value={destination.Name} onChange={(e) => updateDestination(index, "Name", e.target.value)} />
          <Button color={Colors.danger} onClick={() => removeDestination(index)}><Trash/></Button>
        </div>
      ))}

      <Button color={Colors.primary} onClick={sendForm}>Add</Button>
    </div>
  );
};

export default AutoRoutingRoot;

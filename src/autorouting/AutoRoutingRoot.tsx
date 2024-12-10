import React, { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label } from "../ui";
import { AutoroutingEventType, AutoRoutingRule, Destination, RuleCondition } from "./types";

const AutoRoutingRoot = () => {
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<AutoroutingEventType|null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState<RuleCondition>(RuleCondition.AND);
  const [rules, setRules] = useState<AutoRoutingRule[]>("value1");
  const [destinations, setDestinations] = useState<Destination[]>("value1");

  const eventTypeOptions = [
    { label: "New Instance", value: AutoroutingEventType.NEW_INSTANCE },
    { label: "New Series", value: AutoroutingEventType.NEW_SERIES },
    { label: "New Study", value: AutoroutingEventType.NEW_STUDY },
    { label: "New Patient", value: AutoroutingEventType.NEW_PATIENT },
    { label: "Stable Series", value: AutoroutingEventType.STABLE_SERIES },
    { label: "Stable Study", value: AutoroutingEventType.STABLE_STUDY },
    { label: "Stable Patient", value: AutoroutingEventType.STABLE_PATIENT }
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEventTypeChange = (selectedOptions: any) => {
    setEventType(selectedOptions);
  };

  const handleSwitchChange = () => {
    setIsActivated(!isActivated);
  };

  const handleConditionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCondition(event.target.value);
  };

  const handleRuleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRules(event.target.value);
  };

  const handleDestinationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDestinations(event.target.value);
  };

  const handleAddClick = () => {
    const selectedLabels = eventType.map((option) => option.label).join(", ");
    alert(
      `Name: ${name}, Event Type: ${selectedLabels}, Activated: ${isActivated}, Condition: ${condition}, Rule: ${rule}, Destination: ${destination}`
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Input
        label="Name : "
        placeholder="Name"
        value={name}
        onChange={handleInputChange}
      />
      <Label value="Event Type : " htmlFor="eventTypeSelect" />
      <SelectInput
        isMulti
        name="eventTypeSelect"
        value={eventType}
        onChange={handleEventTypeChange}
        options={eventTypeOptions}
        placeholder="Select Label(s)"
        aria-label="Labels"
      />
      <label
        htmlFor="activatedSwitch"
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        Activated:{" "}
      </label>
      <input
        id="activatedSwitch"
        type="checkbox"
        checked={isActivated}
        onChange={handleSwitchChange}
        style={{ marginBottom: "16px" }}
      />
      <label
        htmlFor="conditionSelect"
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        Condition:{" "}
      </label>
      <select
        id="conditionSelect"
        value={condition}
        onChange={handleConditionChange}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      <label
        htmlFor="ruleSelect"
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        Rule:{" "}
      </label>
      <select
        id="ruleSelect"
        value={rule}
        onChange={handleRuleChange}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="value1">value1</option>
        <option value="value2">value2</option>
        <option value="value3">value3</option>
      </select>
      <label
        htmlFor="destinationSelect"
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        Destination:{" "}
      </label>
      <select
        id="destinationSelect"
        value={destination}
        onChange={handleDestinationChange}
        style={{
          padding: "8px",
          width: "100%",
          marginBottom: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="value1">value1</option>
        <option value="value2">value2</option>
        <option value="value3">value3</option>
      </select>
      <button
        onClick={handleAddClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add
      </button>
      <p style={{ marginTop: "20px", color: "#333" }}>
        Hello, {name || "world"}! Selected event type:{" "}
        {eventType.map((option) => option.label).join(", ")}. Activated:{" "}
        {isActivated ? "Yes" : "No"}. Condition: {condition}. Rule: {rule}.
        Destination: {destination}.
      </p>
    </div>
  );
};

export default AutoRoutingRoot;

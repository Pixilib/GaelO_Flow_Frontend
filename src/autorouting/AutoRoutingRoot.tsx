import { useState, ChangeEvent, useEffect } from "react";
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
  // State hooks for managing form data
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState(AutoRoutingCondition.AND);
  const [rules, setRules] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching initial data or settings
    console.log("Component mounted or updated");
  }, []);

  // Handler for input changes
  const handleInputChange = (event) => {
    setName(event.target.value);
    clearError();
  };

  // Handler for event type changes
  const handleEventTypeChange = (selectedOptions) => {
    setEventType(selectedOptions.value);
    clearError();
  };

  // Handler for activation switch changes
  const handleSwitchChange = () => {
    setIsActivated(!isActivated);
    clearError();
  };

  // Handler for condition changes
  const handleConditionChange = (option) => {
    setCondition(option.value);
    clearError();
  };

  // Function to add a new rule with default values
  const addRule = () => {
    const newRule = {
      DicomTag: AutoRoutingRuleDicomTag.PATIENT_NAME,
      ValueRepresentation: AutoRoutingRuleValueRepresentation.STRING,
      Value: "",
      Condition: AutoRoutingRuleCondition.EQUALS,
    };
    setRules([...rules, newRule]);
    clearError();
  };

  // Function to update an existing rule
  const updateRule = (index, key, value) => {
    setRules(rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule)));
    clearError();
  };

  // Function to remove a rule
  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
    clearError();
  };

  // Function to add a new destination with default values
  const addDestination = () => {
    const newDestination = { Destination: AutoRoutingDestinationType.AET, Name: "" };
    setDestinations([...destinations, newDestination]);
    clearError();
  };

  // Function to update an existing destination
  const updateDestination = (index, key, value) => {
    setDestinations(destinations.map((dest, i) => (i === index ? { ...dest, [key]: value } : dest)));
    clearError();
  };

  // Function to remove a destination
  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
    clearError();
  };

  // Function to clear error messages
  const clearError = () => {
    setError("");
  };

  // Function to send the form data to the server
  const sendForm = async () => {
    if (!name || !eventType || rules.length === 0 || destinations.length === 0) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      name,
      eventType,
      isActivated,
      condition,
      rules,
      destinations,
    };

    setIsLoading(true);
    try {
      const response = await fetch("https://api.example.com/autorouting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Form submitted successfully!");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit form.");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {error && <div className="error-message">{error}</div>}
      <Input label="Name" placeholder="Name" value={name} onChange={handleInputChange} disabled={isLoading} />
      <div className="flex gap-3">
        <Label value="Event Type" />
        <SelectInput
          value={eventType}
          onChange={handleEventTypeChange}
          options={Object.values(AutoroutingEventType).map((value) => ({ label: value, value }))}
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-3">
        <Input label="Activated" type="checkbox" checked={isActivated} onChange={handleSwitchChange} disabled={isLoading} />
      </div>
      <div className="flex gap-3">
        <Label value="Condition" />
        <SelectInput
          onChange={handleConditionChange}
          value={condition}
          options={Object.values(AutoRoutingCondition).map((value) => ({ label: value, value }))}
          disabled={isLoading}
        />
      </div>

      <Label value="Rules" />
      <Button color={Colors.primary} onClick={addRule} disabled={isLoading}>Add Rule</Button>
      {rules.map((rule, index) => (
        <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <SelectInput
            value={rule.DicomTag}
            onChange={(e) => updateRule(index, "DicomTag", e.value)}
            options={Object.values(AutoRoutingRuleDicomTag).map((value) => ({ label: value, value }))}
            disabled={isLoading}
          />
          <SelectInput
            value={rule.ValueRepresentation}
            onChange={(e) => updateRule(index, "ValueRepresentation", e.value)}
            options={Object.values(AutoRoutingRuleValueRepresentation).map((value) => ({ label: value, value }))}
            disabled={isLoading}
          />
          <SelectInput
            value={rule.Condition}
            onChange={(e) => updateRule(index, "Condition", e.value)}
            options={Object.values(AutoRoutingRuleCondition).map((value) => ({ label: value, value }))}
            disabled={isLoading}
          />
          <Input placeholder="Value" value={rule.Value} onChange={(e) => updateRule(index, "Value", e.target.value)} disabled={isLoading} />
          <Button color={Colors.danger} onClick={() => removeRule(index)} disabled={isLoading}><Trash /></Button>
        </div>
      ))}

      <Label value="Destinations" />
      <Button color={Colors.primary} onClick={addDestination} disabled={isLoading}>Add Destination</Button>
      {destinations.map((destination, index) => (
        <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
          <SelectInput
            value={destination.Destination}
            onChange={(e) => updateDestination(index, "Destination", e.value)}
            options={Object.values(AutoRoutingDestinationType).map((value) => ({ label: value, value }))}
            disabled={isLoading}
          />
          <Input placeholder="Name" value={destination.Name} onChange={(e) => updateDestination(index, "Name", e.target.value)} disabled={isLoading} />
          <Button color={Colors.danger} onClick={() => removeDestination(index)} disabled={isLoading}><Trash /></Button>
        </div>
      ))}

      <Button color={Colors.primary} onClick={sendForm} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

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
  DestinationRule,
} from "./types";
import { Colors } from "../utils";
import { Trash } from "../icons";
import Destination from "./destination/Destination";

type DestinationWithId = DestinationRule & { id: number }

const AutoRoutingRoot = () => {
  // State hooks for managing form data
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState(AutoRoutingCondition.AND);
  const [rules, setRules] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [destinations, setDestinations] = useState<DestinationWithId[]>([]);

  const addDestination = () => {
    setDestinations((destinations: DestinationWithId[]) => {
      return [
        ...destinations,
        {
          id: Math.random(),
          Destination: AutoRoutingDestinationType.AET,
          Name: "",
        }]
    });
  };

  const updateDestination = (id: number, destination: DestinationRule) => {
    const newDestinations = destinations.map((currentDestination) => {
      return (id === currentDestination.id ? { ...destination, id: id } : currentDestination)
    }
    )
    setDestinations(newDestinations);
  };

  const removeDestination = (id: number) => {
    const newDestinations = destinations.filter((destination) => destination.id !== id)
    setDestinations(newDestinations);
  };

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
      {destinations.map((destination: DestinationWithId) => {
        return <Destination id={destination.id} destination={destination} onChange={(newDestination) => updateDestination(destination.id, newDestination)} onDelete={() => removeDestination(destination.id)} />
      })}

      <Button color={Colors.primary} onClick={sendForm} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

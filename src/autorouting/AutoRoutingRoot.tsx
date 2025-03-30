import React, { useState } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
  AutoroutingEventType,
  AutoRoutingCondition,
  AutoRoutingRuleCondition,
  AutoRoutingRuleValueRepresentation,
  AutoRoutingRuleDicomTag,
  AutoRoutingDestinationType,
  DestinationRule,
} from "./types";
import { Colors } from "../utils";
import Destination from "./destination/Destination";
import Rule from './rule/Rule';

type DestinationWithId = DestinationRule & { id: number };
type RuleType = {
    id: number;
    dicomTag: string;
    valueRepresentation: string;
    value: string;
    condition: string;
};

const AutoRoutingRoot = () => {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState(AutoRoutingCondition.AND);
  const [rules, setRules] = useState<RuleType[]>([]);
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
    });
    setDestinations(newDestinations);
  };

  const removeDestination = (id: number) => {
    const newDestinations = destinations.filter((destination) => destination.id !== id);
    setDestinations(newDestinations);
  };

  const handleInputChange = (event) => {
    setName(event.target.value);
    clearError();
  };

  const handleEventTypeChange = (selectedOptions) => {
    setEventType(selectedOptions.value);
    clearError();
  };

  const handleSwitchChange = () => {
    setIsActivated(!isActivated);
    clearError();
  };

  const handleConditionChange = (option) => {
    setCondition(option.value);
    clearError();
  };

  const addRule = () => {
    const newRule: RuleType = {
        id: Date.now(),
        dicomTag: '',
        valueRepresentation: 'string',
        value: '',
        condition: 'EQUALS'
    };
    setRules([...rules, newRule]);
    clearError();
  };

  const updateRule = (updatedRule: RuleType) => {
    setRules(rules.map(rule => rule.id === updatedRule.id ? updatedRule : rule));
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const clearError = () => {
    setError("");
  };

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
      const response = await fetch("", {
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
      {rules.map((rule: RuleType) => (
        <Rule
            key={rule.id}
            rule={rule}
            onDelete={() => removeRule(rule.id)}
            onChange={updateRule}
        />
      ))}

      <Label value="Destinations" />
      <Button color={Colors.primary} onClick={addDestination} disabled={isLoading}>Add Destination</Button>
      {destinations.map((destination: DestinationWithId) => (
        <Destination
            key={destination.id}
            id={destination.id}
            destination={destination}
            onChange={(newDestination) => updateDestination(destination.id, newDestination)}
            onDelete={() => removeDestination(destination.id)}
        />
      ))}

      <Button color={Colors.primary} onClick={sendForm} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

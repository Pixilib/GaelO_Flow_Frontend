import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
  AutoroutingEventType,
  AutoRoutingRule,
  Destination,
  RuleCondition,
} from "./types";
import { Colors } from "../utils";

const AutoRoutingRoot = () => {
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<AutoroutingEventType | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState<RuleCondition>(RuleCondition.AND);
  
  const [rules, setRules] = useState<AutoRoutingRule[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const conditionsOptions = [
    { label: "And", value: RuleCondition.AND },
    { label: "Or", value: RuleCondition.OR },
  ];

  const eventTypeOptions = [
    { label: "New Instance", value: AutoroutingEventType.NEW_INSTANCE },
    { label: "New Series", value: AutoroutingEventType.NEW_SERIES },
    { label: "New Study", value: AutoroutingEventType.NEW_STUDY },
    { label: "New Patient", value: AutoroutingEventType.NEW_PATIENT },
    { label: "Stable Series", value: AutoroutingEventType.STABLE_SERIES },
    { label: "Stable Study", value: AutoroutingEventType.STABLE_STUDY },
    { label: "Stable Patient", value: AutoroutingEventType.STABLE_PATIENT },
  ];

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

  const handleAddClick = () => {
    /*
    const selectedLabels = eventType.map((option) => option.label).join(", ");
    alert(
      `Name: ${name}, Event Type: ${selectedLabels}, Activated: ${isActivated}, Condition: ${condition}, Rule: ${rule}, Destination: ${destination}`
    );
    */
  };

  console.log(eventType, condition)

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
        options={eventTypeOptions}
      />
      <Label value="Activated :" htmlFor="activatedSwitch" />
      <Input
        type="checkbox"
        checked={isActivated}
        onChange={handleSwitchChange}
      />
      <Label
        value="Condition :"
        htmlFor="conditionSelect"
      />
      <SelectInput
        onChange={handleConditionChange}
        value={condition}
        options={conditionsOptions}
      />
      <Button
        color={Colors.primary}
        onClick={handleAddClick}
      >
        Add
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
  AutoroutingEventType,
  AutoRoutingRule,
  AutoRoutingDestinationType,
  AutoRoutingCondition,
} from "./types";
import { Colors } from "../utils";

const AutoRoutingRoot = () => {
  
  const [name, setName] = useState<string>("");
  const [eventType, setEventType] = useState<AutoroutingEventType | null>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [condition, setCondition] = useState<AutoRoutingCondition>(AutoRoutingCondition.AND);
  
  const [rules, setRules] = useState<AutoRoutingRule[]>([]);
  const [destinations, setDestinations] = useState<AutoRoutingDestinationType[]>([]);

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

  // const handleAddClick = () => {
  //   /*
  //   const selectedLabels = eventType.map((option) => option.label).join(", ");
  //   alert(
  //     `Name: ${name}, Event Type: ${selectedLabels}, Activated: ${isActivated}, Condition: ${condition}, Rule: ${rule}, Destination: ${destination}`
  //   );
  //   */
  // };

  console.log(eventType, condition)

  const [showForm, setShowForm] = useState(false);
  const [showForm2, setShowForm2] = useState(false);


  const handleAddClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleAddClick2 = () => {
    setShowForm2((prev) => !prev);
  };

  const sendForm = () => {
    alert("Sending form (not true)");
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


<Label value="Rules" htmlFor="Rules" />
<Button
        color={Colors.primary}
        onClick={handleAddClick}
      >
        +
      </Button>
      {showForm && (
        <div style={{ marginTop: "10px" }}>
          <input type="text" placeholder="Input 1" />
          <input type="text" placeholder="Input 2" style={{ marginLeft: "10px" }} />
        </div>
      )}



<Label value="Destinations" htmlFor="Rules" />
<Button
        color={Colors.primary}
        onClick={handleAddClick2}
      >
        +
      </Button>
      {showForm2 && (
        <div style={{ marginTop: "10px" }}>
          <input type="text" placeholder="Input 1" />
          <input type="text" placeholder="Input 2" style={{ marginLeft: "10px" }} />
        </div>
      )}


      <Button
        color={Colors.primary}
        onClick={sendForm}
      >
        Add
      </Button>
    </div>
  );
};

export default AutoRoutingRoot;

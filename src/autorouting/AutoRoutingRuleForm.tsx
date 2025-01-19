// AutoRoutingRuleForm
// Author: Julien VIGNAU-ESPINE
// Date: 13-01-2024

import { useState, ChangeEvent } from "react";
import { Input, SelectInput, Label, Button } from "../ui";
import {
    AutoroutingEventType,
    AutoRoutingRule,
    Destination,
    RuleCondition,
    AutoRoutingRuleFormType,
} from "./types";
import { Colors } from "../utils";

/*

"DicomTag": Input: "PatientName", 
"ValueRepresentation": Select: "String" "number",
"Value": input string
"Condition": select: "EQUALS"

*/

const AutoRoutingRuleForm = () => {

    const [PatientName, setPatientName] = useState<string>("");

    const [Value, setValue] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPatientName(event.target.value);
      };

    const handleInputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };

    //   const handleValeRepresentationChange = (option) => {
    //     setCondition(option.value);
    //   };

      // MUST BE CHANGED !!!!!!
      const eventValueRepresentationOptions = [
        { label: "Option 1", value: AutoRoutingRuleFormType.OPTION1 },
        { label: "Option 2", value: AutoRoutingRuleFormType.OPTION2 },
        { label: "Option 3", value: AutoRoutingRuleFormType.OPTION3 },
        { label: "Option 4", value: AutoRoutingRuleFormType.OPTION4 },
      ];

    return (
        <div>
            <Input
                label="PatientName :"
                placeholder="PatientName"
                value={PatientName}
                onChange={handleInputChange}
            />

            {/* Here goes value representation select */}
            
            <Input
                label="Value :"
                placeholder="Value"
                value={Value}
                onChange={handleInputChangeValue}
            />
        </div>
    );
};

export default AutoRoutingRuleForm;
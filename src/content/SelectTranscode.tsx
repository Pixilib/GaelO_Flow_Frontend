import { useState } from "react";
import { SelectInput, Label } from "../ui";
import { TRANSCODING_OPTIONS } from "../utils/constants";

type SelectTranscodeProps = {
    transfetSyntax: string;
    setTrasferSyntax: (value: string) => void;
};

const SelectTranscode = ({transfetSyntax, setTrasferSyntax}: SelectTranscodeProps) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
        <div>
            <Label
                value="Transfer Syntax"
            />
            <SelectInput
                value={transfetSyntax}
                onChange={(option) => {
                    setTrasferSyntax(option?.value);
                }}
                placeholder="Select option"
                options={TRANSCODING_OPTIONS}
            />
        </div>
    );
}

export default SelectTranscode;
import { useState } from "react";
import { SelectInput, Label } from "../ui";

type SelectTranscodeProps = {
    transfetSyntax: string;
    setTrasferSyntax: (value: string) => void;
};

const SelectTranscode = ({transfetSyntax, setTrasferSyntax}: SelectTranscodeProps) => {
    const TRANSCODING_OPTIONS = [
        { value: null, label: 'None (use Original TS)' },
        { value: '1.2.840.10008.1.2', label: 'Implicit VR Endian' },
        { value: '1.2.840.10008.1.2.1', label: 'Explicit VR Little Endian' },
        { value: '1.2.840.10008.1.2.1.99', label: 'Deflated Explicit VR Little Endian' },
        { value: '1.2.840.10008.1.2.2', label: 'Explicit VR Big Endian' },
        { value: '1.2.840.10008.1.2.4.50', label: 'JPEG 8-bit' },
        { value: '1.2.840.10008.1.2.4.51', label: 'JPEG 12-bit' },
        { value: '1.2.840.10008.1.2.4.57', label: 'JPEG Lossless' },
        { value: '1.2.840.10008.1.2.4.70', label: 'JPEG Lossless' },
        { value: '1.2.840.10008.1.2.4.80', label: 'JPEG-LS Lossless' },
        { value: '1.2.840.10008.1.2.4.81', label: 'JPEG-LS Lossy' },
        { value: '1.2.840.10008.1.2.4.90', label: 'JPEG 2000 (90)' },
        { value: '1.2.840.10008.1.2.4.91', label: 'JPEG 2000 (91)' },
        { value: '1.2.840.10008.1.2.4.92', label: 'JPEG 2000 (92)' },
        { value: '1.2.840.10008.1.2.4.93', label: 'JPEG 2000 (93)' },
    ];
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
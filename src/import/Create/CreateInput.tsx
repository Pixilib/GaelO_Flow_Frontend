import React, { ChangeEvent, useState } from "react";
import { MdOutlineNewLabel as LabelIcon } from "react-icons/md";
import { Button, SelectInput } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../utils/types";

type CreateInputProps = {
  onCreateLabel: (payload: Label) => void;
};

const CreateInput = ({ onCreateLabel }: CreateInputProps) => {
  const [label, setLabel] = useState<string | null>(null);

  const handleInputChange = (selectedOption: any) => {
    setLabel(selectedOption?.value);
  };

  const handleCreateClick = () => {
    if (!label) return;
    const trimmedLabel = label.trim();
    onCreateLabel({ Name: trimmedLabel });
    setLabel(null);
  };

  const selectOptions = [
    { value: 'option', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  return (
    <div className="relative flex items-center">
      <SelectInput
        value={label ?? ""}
        onChange={handleInputChange}
        placeholder="Add new label"
        options={selectOptions}
        className="w-full border border-gray-300 rounded-r-none shadow-md rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <Button
        type="button"
        color={Colors.success}
        onClick={handleCreateClick}
        className="text-white rounded-l-none shadow-md rounded-r-2xl min-w-20"
      >
      Create 
      </Button>
    </div>
  );
};

export default CreateInput;

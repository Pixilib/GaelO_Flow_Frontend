import { ChangeEvent, useState } from "react";
import { MdOutlineNewLabel as LabelIcon } from "react-icons/md";
import { Button, Input } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../utils/types";

type LabelInputFormProps = {
  onCreateLabel: (payload: Label) => void;
};

const LabelInputForm = function ({ onCreateLabel }: LabelInputFormProps) {
  const [label, setLabel] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event?.target?.value);
  };

  const handleCreateClick = () => {
    if (!label) return;
    const trimmedLabel = label.trim();
    onCreateLabel({ Name: trimmedLabel });
    setLabel(null);
  };

  return (
    <div className="relative flex items-center">
      <Input
        type="text"
        value={label ?? ""}
        onChange={handleInputChange}
        placeholder="Add new label"
        bordered
        className="w-full py-4 pl-12 pr-8 border border-gray-300 rounded-r-none rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <LabelIcon className="absolute text-2xl text-gray-400 transform -translate-y-1/2 top-1/2 left-4" />
      <Button
        type="button"
        color={Colors.success}
        onClick={handleCreateClick}
        className="p-4 text-white rounded-l-none shadow-md rounded-r-2xl min-w-20"
      >
        +
      </Button>
    </div>
  );
};

export default LabelInputForm;

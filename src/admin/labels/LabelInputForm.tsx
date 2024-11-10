import { ChangeEvent, useState } from "react";
import { Button, Input } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../icons";

type LabelInputFormProps = {
  onCreateLabel: (label: string) => void;
  className?: string;
};

const LabelInputForm = function ({ onCreateLabel }: LabelInputFormProps) {
  const [label, setLabel] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event?.target?.value);
  };

  const handleCreateClick = () => {
    if (!label) return;
    const trimmedLabel = label.trim();
    onCreateLabel(trimmedLabel);
    setLabel(null);
  };

  return (
    <div className="relative flex items-center">
      <Input
        svgLeft={<Label className="text-2xl text-gray-400" />}
        type="text"
        value={label ?? ""}
        onChange={handleInputChange}
        placeholder="Add new label"
        bordered
        className="w-full border border-gray-300 rounded-r-none shadow-md rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <Button
        type="button"
        color={Colors.success}
        onClick={handleCreateClick}
        className="text-white rounded-l-none shadow-md rounded-r-2xl min-w-20"
      >
        +
      </Button>
    </div>
  );
};

export default LabelInputForm;

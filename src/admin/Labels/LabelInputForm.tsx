import { ChangeEvent, useState } from "react";
import { MdOutlineNewLabel } from "react-icons/md";
import { Button, Input } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../utils/types";

type LabelInputFormProps = {
  onCreateLabel: (payload: Label) => void;
};
const LabelInputForm = function ({ onCreateLabel }: LabelInputFormProps) {
  const [label, setLabel] = useState<string|null>(null);

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
        className="w-full py-4 pl-10 border border-gray-300 focus:outline-none focus:ring-"
      />
      <MdOutlineNewLabel
        className="absolute text-2xl transform -translate-y-1/2 top-1/2 left-3"
        color={Colors.gray}
      />
      <Button
        type="button"
        color={Colors.success}
        onClick={handleCreateClick}
        className="right-0 p-4 mt-16 text-white transform -translate-y-1/2 rounded-l-none rounded-r-md top-1/2"
      >
        +
      </Button>
    </div>
  );
};

export default LabelInputForm;

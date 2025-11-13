import { ChangeEvent, useState } from "react";
import { Button, Input } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label } from "../../icons";
import { useTranslation } from "react-i18next";
import {FormBuilder} from "../../ui/FormBuilder/FormBuilder"

type LabelInputFormProps = {
  onCreateLabel: (label: string) => void;
  className?: string;
};

const LabelInputForm = function ({ onCreateLabel }: LabelInputFormProps) {
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const {t} = useTranslation()

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
    <div>
    <div data-gaelo-flow="labels-add-labels" className="relative flex items-center">
      <Input
        svgLeft={<Label className="text-2xl text-gray-400 dark:text-white" />}
        type="text"
        value={label ?? ""}
        onChange={handleInputChange}
        placeholder={t("admin.labels.add-new-label")}
        bordered
        className="w-full border border-gray-300 rounded-r-none shadow-md rounded-l-xl focus:outline-hidden focus:ring-2 focus:ring-gray-300"
      />
      <Button
        type="button"
        color={Colors.success}
        onClick={handleCreateClick}
        className="text-white rounded-l-none shadow-md rounded-r-2xl min-w-20"
      >
        +
      </Button>
      <Button
        type="button"
        color={Colors.primary}
        onClick={() => setShowFormBuilder(!showFormBuilder)}
        className="ml-2 text-white shadow-md rounded-2xl min-w-20"
      >
        formulaire
      </Button>
    </div>
     {showFormBuilder && (
        <div className="mt-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
          <FormBuilder />
        </div>
      )}
    </div>
  );
};

export default LabelInputForm;

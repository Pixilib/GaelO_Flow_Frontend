import { getLabels, getLabelsByRoleName } from "../services";
import { useCustomQuery } from "../utils";
import { SelectInput, Spinner } from "../ui";
import { Label, Option } from "../utils/types";

type SelectLabelsProps = {
  values: string[];
  onChange: (labels: string[]) => void;
}

const SelectLabels = ({ onChange, values }: SelectLabelsProps) => {

  const { data: labelsOptions, isPending } = useCustomQuery<Label[], Option[]>(
    ["labels"],
    () => getLabels(),
    {
      select: (labels : Label[]) => {
        const formattedOptions = labels.map((label) => ({
          value: label.name,
          label : label.name,
        }));
        return formattedOptions;
      }
    }
  );

  const handleChange = (options) => {
    onChange(options.map((option) => option.value))
  }

  if (isPending) return <Spinner />;

  return (
    <SelectInput
      isMulti
      menuPosition="fixed"
      options={labelsOptions}
      onChange={handleChange}
      closeMenuOnSelect={true}
      placeholder='Select labels ...'
      value={values}
    />
  );
};

export default SelectLabels;

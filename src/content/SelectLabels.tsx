import { getLabels, getLabelsByRoleName } from "../services";
import { useCustomQuery } from "../utils";
import { SelectInput, Spinner } from "../ui";
import { Label, Option } from "../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

type SelectLabelsProps = {
  values: string[];
  onChange: (labels: string[]) => void;
}

const SelectLabels = ({ onChange, values }: SelectLabelsProps) => {

  const roleName = useSelector(
    (state: RootState) => state.user.role?.name || ""
  );

  const { data: labelsOptions, isPending } = useCustomQuery<string[], Option[]>(
    ["roles", roleName, "labels"],
    () => getLabelsByRoleName(roleName),
    {
      select: (labels : string[]) => {
        const formattedOptions = labels.map((label) => ({
          value: label,
          label : label,
        }));
        return formattedOptions;
      }
    }
  );

  const handleChange = (options) => {
    onChange(options.map((option) => option.value))
  }

  if (isPending) return <Spinner />;

  console.log(labelsOptions);

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

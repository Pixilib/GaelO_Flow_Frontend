import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getLabelsByRoleName } from "../services";
import { useCustomQuery } from "../utils";
import { SelectInput, Spinner } from "../ui";

type SelectLabelsProps = {
  value: string[];
  onChange: (labels: string[]) => void;
}

const SelectLabels = ({ onChange, value }: SelectLabelsProps) => {

  const [selectedLabels, setSelectedLabels] = useState([])

  const roleName = useSelector(
    (state: RootState) => state.user.role?.name || ""
  );

  const { data: labelsOptions, isPending } = useCustomQuery(
    ["roles", roleName, "labels"],
    () => getLabelsByRoleName(roleName),
    {
      select: (labels) => {
        const formattedOptions = labels.map((label) => ({
          value: label,
          label,
        }));
        return formattedOptions;
      },
      enabled: roleName != null
    }
  );

  console.log(selectedLabels)
  const handleChange = (option, meta) => {
    console.log(option, meta)
    if (meta.action === "select-option") {
      setSelectedLabels(labels => [...labels, option.value])
    }
    else if (meta.action === "deselect-option") {
      setSelectedLabels(labels => labels.filter(label => label !== option.value))

    }
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
      value={selectedLabels.map(option => option.value)}
    />
  );
};

export default SelectLabels;

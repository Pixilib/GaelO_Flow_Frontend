import React, { useState, useEffect } from "react";

import Select, { ActionMeta, MultiValue } from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getLabelsByRoleName } from "../services";
import { Option, useCustomQuery } from "../utils";
import { Spinner } from "../ui";

interface SelectLabelsProps {
  onChange: (labels: string[]) => void;
  closeMenuOnSelect?: boolean;
}

const SelectLabels: React.FC<SelectLabelsProps> = ({
  onChange,
  closeMenuOnSelect = true,
}) => {
  const [selectedLabels, setSelectedLabels] =
    useState<MultiValue<Option> | null>(null);

  const roleName = useSelector(
    (state: RootState) => state.user.role?.name || ""
  );

  useEffect(() => {
    onChange(selectedLabels?.map((option) => option.value) ?? []);
  }, [selectedLabels]);

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
      enabled : roleName != null
    }
  );

  const handleChange = (
    options: MultiValue<Option>,
    _actionMeta: ActionMeta<Option>
  ) => {
    setSelectedLabels(options);
  };

  if (isPending) return <Spinner />;

  return (
    <>
      <Select
        isMulti
        menuPosition="fixed"
        options={labelsOptions}
        onChange={handleChange}
        closeMenuOnSelect={closeMenuOnSelect}
        className="basic-single"
        classNamePrefix="select"
      />
    </>
  );
};

export default SelectLabels;

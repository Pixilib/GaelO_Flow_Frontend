import React, { useState, useEffect } from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getLabelsByRoleName } from "../services";
import { Option, useCustomQuery } from "../utils";
import { Spinner } from "../ui";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0.25rem 0.5rem",
    minHeight: "2.5rem",
    borderColor: "#037F6E",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#037F6E",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    overflow: "hidden",
  }),
  menuList: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    padding: "0.25rem 0",
    marginLeft: "5px",
    marginRight: "5px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "10px",
    backgroundColor: state.isFocused ? "#E6F7F4" : "white",
    color: "#037F6E",
    margin: "0 5px",
    "&:hover": {
      backgroundColor: "#E6F7F4",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    borderRadius: "15px",
    backgroundColor: "#E6F7F4",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#037F6E",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    borderRadius: "50%",
    backgroundColor: "#037F6E",
    color: "white",
    padding: "0.1rem",
    fontSize: "0.6rem",
    width: "1rem",
    height: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0.25rem",
    ':hover': {
      backgroundColor: "#025D57",
    },
  }),
};

interface SelectLabelsProps {
  onChange: (labels: string[]) => void;
  closeMenuOnSelect?: boolean;
  className?: string;
}

const SelectLabels: React.FC<SelectLabelsProps> = ({
  onChange,
  closeMenuOnSelect = true,
  className,
}) => {
  const [selectedLabels, setSelectedLabels] = useState<MultiValue<Option> | null>(null);

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
      enabled: roleName != null
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
    <Select
      isMulti
      menuPosition="fixed"
      options={labelsOptions}
      onChange={handleChange}
      closeMenuOnSelect={closeMenuOnSelect}
      placeholder='Select labels ...'
      className={`basic-single ${className}`}
      classNamePrefix="select"
      styles={customStyles}
    />
  );
};

export default SelectLabels;

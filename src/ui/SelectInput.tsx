import React from 'react';
import Select, { GroupBase, StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SelectionInputProps {
  options: OptionType[] | GroupBase<OptionType>[];
  onChange: (value: any) => void; 
  placeholder?: string;
  formatOptionLabel?: (option: OptionType) => React.ReactNode;
  isMulti?: boolean;
  formatGroupLabel?: (group: GroupBase<OptionType>) => React.ReactNode;
  styles?: StylesConfig<OptionType, boolean>;
}

const SelectionInput: React.FC<SelectionInputProps> = ({
  options,
  onChange,
  placeholder = 'Select...',
  formatOptionLabel = (option) => option.label,
  isMulti = false,
  formatGroupLabel,
  styles,
  ...props
}) => (
  <Select
    options={options}
    isMulti={isMulti}
    onChange={onChange}
    placeholder={placeholder}
    formatOptionLabel={formatOptionLabel}
    formatGroupLabel={formatGroupLabel}
    styles={styles}
    {...props}
  />
);

export default SelectionInput;

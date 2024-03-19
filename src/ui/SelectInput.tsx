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

const customStyles: StylesConfig<OptionType, boolean> = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0.375rem', 
    borderColor: state.isFocused ? 'indigo-600' : 'gray-200', 
    boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? 'indigo-600' : 'primary', 
    },
    backgroundColor: state.isFocused ? '#EFF6FF' : '#EFF6FF',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '0.375rem',
    borderColor: 'gray-200', 
  }),
  
};

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
    styles={{ ...customStyles, ...styles }}
    {...props}
  />
);

export default SelectionInput;

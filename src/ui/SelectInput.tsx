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
    borderRadius: '10px',
    borderColor: state.isFocused ? '#333182' : '#D1D5DB',
    borderWidth: '2px',
    boxShadow: 'none',

    '&:hover': {
      borderColor: state.isFocused ? '#333182' : '#D1D5DB',
    },
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: '10px',
    padding: '12px',
  }),

  option: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    padding: '8px 16px',
    backgroundColor: state.isSelected ? '#333182' : 'white',
    color: state.isSelected ? 'white' : 'grey',

    '&:hover': {
      backgroundColor: '#333182',
      color: 'white',
    }
  })
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

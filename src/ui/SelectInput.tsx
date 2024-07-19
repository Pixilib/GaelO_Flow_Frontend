import React from 'react';
import Select, { StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  value: string|null;
  options: OptionType[];
  onChange: (selectedOption: OptionType | null) => void;
  placeholder?: string;
  rounded?: boolean;
}

const customStyles: StylesConfig<OptionType, boolean> = {
  control: (provided, state) => {
    const borderRadius = state.selectProps.rounded ? '14px' : '0px';
    return {
      ...provided,
      borderRadius: borderRadius,
      backgroundColor: '#f8f9fa',
      borderColor: state.isFocused ? '#333182' : '#D1D5DB',
      borderWidth: '1px',
      padding: '0.1em',
      minHeight: '32px',
      '&:hover': {
        borderColor: '#333182',
      },
    };
  },
  menu: (provided, state) => {
    const borderRadius = state.selectProps.rounded ? '10px' : '0px';
    return {
      ...provided,
      borderRadius: borderRadius,
      padding: '12px',
    };
  },
  option: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    padding: '8px 6px',
    backgroundColor: state.isSelected ? '#333182' : 'white',
    color: state.isSelected ? 'white' : 'grey',
    '&:hover': {
      backgroundColor: '#333182',
      color: 'white',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#E2E8F0',
    borderRadius: '6px',
    padding: '2px 6px',
    margin: '2px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#1F2937',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#EF4444',
    '&:hover': {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
    },
  }),
};

const SelectInput: React.FC<SelectInputProps> = ({
  value,
  options,
  onChange,
  placeholder = 'Select...',
  rounded = true,
}) => (
  <Select
    options={options}
    onChange={(selectedOption: any) => onChange(selectedOption)}
    placeholder={placeholder}
    styles={customStyles}
    value={value ? options.find(option => option.value === value) : null}
    className={`w-full ${rounded ? 'rounded-xl' : ''} focus:outline-none focus:ring-2 focus:ring-gray-300`}
    rounded={rounded} 
  />
);

export default SelectInput;

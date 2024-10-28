import Select, { ActionMeta, ClassNamesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  isMulti?: boolean;
  value: string | string[] | null;
  options: OptionType[] | any;
  onChange: (selectedOption: OptionType | OptionType[] | null, meta: ActionMeta<OptionType>) => void;
  placeholder?: string;
  rounded?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  menuPosition?: "fixed";
  formatOptionLabel?: any;
  formatGroupLabel?: any;
}

const customClass: ClassNamesConfig<OptionType, boolean> = {
  control: (state) => {
    const borderRadius = state.selectProps.rounded ? 'rounded-3xl' : 'rounded-xl';
    return `border border-gray-300 min-h-[48px] bg-white ${borderRadius} focus:border-primary hover:border-primary`;
  },
  menu: (state) => {
    return 'rounded-3xl p-2 bg-white';
  },
  option: (state) => {
    return `rounded-lg p-3 ${state.isSelected ? ' text-white' : 'bg-white text-gray-800'} hover:bg-primary hover:text-white`;
  },
  multiValue: () => 'bg-gray-200 rounded-3xl px-2 py-1',
  multiValueLabel: () => 'text-gray-800',
  multiValueRemove: () => 'text-red-500 hover:bg-red-200 rounded-full p-1',
};

const SelectInput = ({
  value,
  isMulti = false,
  options,
  onChange,
  placeholder = 'Select...',
  rounded = true,
  isClearable = false,
  closeMenuOnSelect = true,
  menuPosition = undefined,
  formatOptionLabel = undefined,
  formatGroupLabel = undefined
}: SelectInputProps) => {
  return (
    <Select
      options={options}
      onChange={(selectedOption: any, meta: any) => onChange(selectedOption, meta)}
      placeholder={placeholder}
      classNames={customClass}
      isClearable={isClearable}
      menuPosition={menuPosition}
      formatOptionLabel={formatOptionLabel}
      formatGroupLabel={formatGroupLabel}
      isMulti={isMulti}
      value={value ? (isMulti ? options.filter(option => value.includes(option.value)) : options.find(option => option.value === value)) : null}
      className={`w-full ${rounded ? 'rounded-3xl' : ''} focus:outline-none focus:ring-2 focus:ring-gray-300`}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  )
};

export default SelectInput;

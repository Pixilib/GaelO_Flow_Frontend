import Select, { ActionMeta, StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

interface SelectInputProps {
  isMulti?: boolean;
  value: string | string[] | null;
  options: OptionType[];
  onChange: (selectedOption: OptionType | OptionType[] | null, meta: ActionMeta<OptionType>) => void;
  placeholder?: string;
  rounded?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  menuPosition?: "fixed" | undefined;
  formatOptionLabel?: (option: OptionType) => JSX.Element;
  formatGroupLabel?: (group: { label: string; options: OptionType[] }) => JSX.Element;
}

// Styles personnalisés pour React-Select
const customStyles: StylesConfig<OptionType, boolean> = {
  placeholder: (base) => ({
    ...base,
    color: 'white', // Placeholder en blanc
  }),
  input: (base) => ({
    ...base,
    color: 'white', // Texte saisi en blanc
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white', // Valeur sélectionnée en blanc
  }),
};

const customClass: ClassNamesConfig<OptionType, boolean> = {
  control: (state) => {
    const borderRadius = state.selectProps.rounded ? 'rounded-3xl' : 'rounded-xl';
    return `border border-gray-300 min-h-[40px] bg-gray-50 dark:bg-neutral-800 ${borderRadius} focus:border-active hover:border-primary-active px-2`;
  },
  menu: () => 'rounded-3xl p-1 bg-white dark:bg-neutral-800',
  option: (state) => {
    return `rounded-xl p-2 ${state.isSelected ? 'bg-primary-active text-white' : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-white'} hover:bg-primary hover:text-white px-2`;
  },
  multiValue: () => 'bg-gray-200 dark:bg-neutral-800 rounded-3xl px-2 py-0.5',
  multiValueLabel: () => 'text-gray-800',
  multiValueRemove: () => 'text-red-500 hover:bg-red-200 rounded-full p-0.5',
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
  formatOptionLabel,
  formatGroupLabel
}: SelectInputProps) => {
  const selectedValue = isMulti 
    ? (value as string[]).map(val => options.find(option => option.value === val)).filter(Boolean)
    : options.find(option => option.value === value) || null;

  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      styles={customStyles}
      classNames={customClass}
      isClearable={isClearable}
      menuPosition={menuPosition}
      formatOptionLabel={formatOptionLabel}
      formatGroupLabel={formatGroupLabel}
      isMulti={isMulti}
      value={selectedValue}
      className={`w-full ${rounded ? 'rounded-3xl' : ''} focus:outline-none focus:ring-2 focus:ring-gray-300`}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default SelectInput;

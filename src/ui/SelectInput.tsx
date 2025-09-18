import Select, { ActionMeta, GroupBase } from "react-select";

type OptionType = { value: string; label: string; [key: string]: string };

type SelectInputProps = {
  isMulti?: boolean;
  name?: string;
  value: string | string[] | null;
  options: OptionType[] | any;
  onChange: (
    selectedOption: OptionType | OptionType[] | null,
    meta: ActionMeta<OptionType>
  ) => void;
  placeholder?: string;
  rounded?: boolean;
  isClearable?: boolean;
  closeMenuOnSelect?: boolean;
  menuPosition?: "fixed" | undefined;
  formatOptionLabel?: (option: OptionType) => JSX.Element;
  formatGroupLabel?: (group: {
    label: string;
    options: OptionType[];
  }) => JSX.Element;
};

const customClass: ClassNamesConfig<OptionType, boolean> = {
  control: (state) => {
    const borderRadius = state.selectProps.rounded
      ? "rounded-3xl"
      : "rounded-xl";
    return `border border-gray-300 bg-gray-50 text-black dark:!bg-neutral-800 ${borderRadius} focus:border-active hover:border-primary-active`;
  },
  menu: () => "rounded-3xl p-1 bg-white dark:!bg-neutral-800",
  option: (state) => {
    return `rounded-xl p-2 ${state.isSelected ? "bg-primary-active" : "bg-white dark:!bg-neutral-800 text-gray-800 dark:!text-white"} hover:bg-primary hover:text-white hover:dark:!bg-neutral-600 `;
  },
  singleValue: () => "text-black dark:!text-white",
  multiValue: () => "bg-gray-200 dark:!bg-neutral-600 dark:!text-white rounded-3xl px-2 py-0.5",
  multiValueLabel: () => "text-gray-800 dark:!text-white",
  multiValueRemove: () => "text-red-500 hover:bg-red-200 rounded-full p-0.5",
};

const SelectInput = ({
  value,
  name,
  isMulti = false,
  options,
  onChange,
  placeholder = "Select...",
  rounded = true,
  isClearable = false,
  closeMenuOnSelect = true,
  menuPosition = undefined,
  formatOptionLabel,
  formatGroupLabel,
}: SelectInputProps) => {
  const selectedValue = isMulti
    ? (value as string[])
        .map((val) => {
              const allOptions = options
                .map((option) => {
                  //groupped options case
                  if(option.options) return option.options;
                  else return option
                })
                .flat()
                return allOptions.find((option) => option.value === val)
        })
        .filter(Boolean)
    : options.find((option) => option.value === value) || null;

  return (
    <Select
      name={name}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      classNames={customClass}
      isClearable={isClearable}
      menuPosition={menuPosition}
      formatOptionLabel={formatOptionLabel}
      formatGroupLabel={formatGroupLabel}
      isMulti={isMulti}
      value={selectedValue}
      className={`w-full ${rounded ? "rounded-3xl" : ""} focus:outline-hidden focus:ring-2 focus:ring-gray-300`}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default SelectInput;

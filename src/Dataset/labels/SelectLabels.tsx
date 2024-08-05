import React, { useState } from 'react';
import Select from 'react-select/creatable';

type OptionType = {
  value: string;
  label: string;
};

type SelectLabelsProps = {
  options: OptionType[];  
  onChange: (selectedOptions: OptionType[]) => void;  
  closeMenuOnSelect?: boolean;
};

const SelectLabels: React.FC<SelectLabelsProps> = ({ options, onChange, closeMenuOnSelect = true }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]); 

  const formatOptionLabel = ({ label }: OptionType): JSX.Element => (
    <div className='flex'>
      <div>{label}</div>
    </div>
  );

  const changeListener = (options: OptionType[] | null) => {
    const newOptions = options ?? [];
    setSelectedOptions(newOptions);
    onChange(newOptions);
  };

  return (
    <Select
      isMulti
      menuPosition="fixed"
      options={options}
      formatOptionLabel={formatOptionLabel}
      value={selectedOptions}
      onChange={changeListener}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  );
};

export default SelectLabels;

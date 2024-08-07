import React, { useState, useEffect } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getLabelsByRoleName } from '../../services';

type OptionType = {
  value: string;
  label: string;
};

interface SelectLabelsProps {
  onChange: (options: OptionType[]) => void;
  closeMenuOnSelect?: boolean;
}

const SelectLabels: React.FC<SelectLabelsProps> = ({
  onChange,
  closeMenuOnSelect = true,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const roleName = useSelector((state: RootState) => state.user.role?.name || '');

  useEffect(() => {
    if (!roleName) {
      setError('Role name is required');
      return;
    }

    const fetchLabels = async () => {
      try {
        const labels = await getLabelsByRoleName(roleName);
        const formattedOptions = labels.map((label) => ({ value: label, label }));
        setOptions(formattedOptions);
        setError(null);
      } catch (error: any) {
        setError(`Failed to fetch labels: ${error.message}`);
      }
    };

    fetchLabels();
  }, [roleName]);

  const handleChange = (newValue: MultiValue<OptionType>, _actionMeta: ActionMeta<OptionType>) => {
    onChange(newValue);
  };

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <Select
        isMulti
        menuPosition="fixed"
        options={options}
        onChange={handleChange}
        closeMenuOnSelect={closeMenuOnSelect}
        className="basic-single"
        classNamePrefix="select"
      />
    </>
  );
};

export default SelectLabels;

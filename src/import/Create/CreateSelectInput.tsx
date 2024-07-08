import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { SelectInput } from '../../ui'; // Assurez-vous que cet import est correct

const TestComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
        setSelectedOption(selectedOption);
    };

    const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
    ];

    return (
        <div style={{ padding: '20px', border: '1px solid black' }}>
            <h1>Select Input Test</h1>
            <SelectInput
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Select option"
                options={selectOptions}
            />
        </div>
    );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));

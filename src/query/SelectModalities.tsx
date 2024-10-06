import { useEffect, useState } from 'react'
import { Option } from '../utils';
import { SelectInput } from '../ui';

type SelectModalitiesProps = {
    modalities: string[];
    onChange: (modalities: string[]) => void;
    closeMenuOnSelect?: boolean;
}
const SelectModalities = ({ modalities, onChange, closeMenuOnSelect = true }: SelectModalitiesProps) => {

    const [selectedModalities, setSelectedModalities] = useState<Option[]>([])

    useEffect(() => {
        const previousModalityArray = modalities.map((modality) => {
            return { value: modality, label: modality }
        })
        setSelectedModalities(previousModalityArray)

    }, [JSON.stringify(modalities)])

    const modalitiesRadiology = [
        { value: 'CT', label: 'CT', explanation: 'Computed Tomography' },
        { value: 'DX', label: 'DX', explanation: 'Digital Radiography' },
        { value: 'CR', label: 'CR', explanation: 'Computed Radiography' },
        { value: 'MR', label: 'MR', explanation: 'Magnetic Resonance' },
        { value: 'US', label: 'US', explanation: 'Ultrasound' },
        { value: 'MG', label: 'MG', explanation: 'Mammography' },
        { value: 'XA', label: 'XA', explanation: 'X-Ray Angiography' }
    ]

    const modalitiesNuclearMedicine = [
        { value: 'PT', label: 'PT', explanation: 'Positron emission tomography' },
        { value: 'NM', label: 'NM', explanation: 'Nuclear Medicine' }
    ]

    const modalitiesRadiotherapy = [
        { value: 'RTDOSE', label: 'RTDOSE', explanation: 'Radiotherapy Dose' },
        { value: 'RTIMAGE', label: 'RTIMAGE', explanation: 'Radiotherapy Image' },
        { value: 'RTPLAN', label: 'RTPLAN', explanation: 'Radiotherapy Plan' },
        { value: 'RTRECORD', label: 'RTRECORD', explanation: 'RT Treatment Record' },
        { value: 'RTSTRUCT', label: 'RTSTRUCT', explanation: 'Radiotherapy Structure Set' },
        { value: 'SEG', label: 'SEG', explanation: 'Segmentation' },
    ]

    const groupedOptions = [
        {
            label: 'Radiology',
            options: modalitiesRadiology,
        },
        {
            label: 'NuclearMedicine',
            options: modalitiesNuclearMedicine,
        },
        {
            label: 'Radiotherapy',
            options: modalitiesRadiotherapy,
        },
    ]

    const formatOptionLabel = ({ label, explanation }: any): JSX.Element => (
        <div className='flex'>
            <div>{label}</div>
            <div className='ml-3'>
                {explanation}
            </div>
        </div>
    );

    const formatGroupLabel = (data: any) => (
        <div className="flex justify-center space-between">
            <span> {data.label} </span>
            <span> {data.details} </span>
        </div>
    );

    const changeListener = (selectedOption, meta) => {
        if(meta.action === "select-option") {
        }

        
    }

    return (
        <SelectInput
            isMulti
            menuPosition="fixed"
            options={groupedOptions}
            formatOptionLabel={formatOptionLabel}
            value={selectedModalities.map(option => option.value)}
            onChange={changeListener}
            formatGroupLabel={formatGroupLabel}
            closeMenuOnSelect={closeMenuOnSelect}
        />
    )

}

export default SelectModalities
import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui';
import { Colors } from '../utils/enums';
import SelectLabels from './labels/SelectLabels';
import { Label as LabelType } from '../utils/types';

const DatasetRoot = () => {
    // État pour stocker les labels
    const [labels, setLabels] = useState<LabelType[]>([]);
    const [selectedLabels, setSelectedLabels] = useState<LabelType[]>([]);

    // Fonction pour gérer les changements dans les labels sélectionnés
    const handleSelectChange = (selectedOptions: { value: string; label: string }[]) => {
        const newSelectedLabels = selectedOptions.map(option => ({ Name: option.value, label: option.label }));
        setSelectedLabels(newSelectedLabels);
        console.log('Options sélectionnées:', newSelectedLabels);
    };

    // Fonction pour supprimer un label
    const handleDeleteLabel = (labelName: string) => {
        setLabels((prevLabels) => prevLabels.filter(label => label.Name !== labelName));
    };

    const labelOptions = labels.map(label => ({ value: label.Name, label: label.Name }));

    return (
        <Card>
            <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={'Dataset'}
            />
            <CardBody>
                <div>
                    <SelectLabels
                        options={labelOptions}
                        onChange={handleSelectChange}
                        closeMenuOnSelect={false}
                    />
                </div>
            </CardBody>
            <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
            </CardFooter>
        </Card>
    );
};

export default DatasetRoot;

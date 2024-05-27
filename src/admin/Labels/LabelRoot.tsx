
import React, { useState } from 'react';

import { useCustomToast } from '../../utils/toastify';

import LabelInputForm from "./LabelInputForm";
import LabelTable from "./LabelTable";
import Badge from './Badge';



const LabelRoot = () => {
    const { toastSuccess, toastError } = useCustomToast();
    const [labels, setLabels] = useState([]);

    const handleCreate = (newLabel) => {
        setLabels([...labels, newLabel]);
        toastSuccess("Label created successfully");
    };

    const deleteLabel = (labelId) => {
        setLabels(labels.filter(label => label.id !== labelId));
        toastSuccess("Label deleted successfully"); 
    };

    return (
        <div className="mx-12 my-12 shadow-md rounded-xl">
            <LabelTable 
                data={labels} 
                onEdit={() => { }} 
                onDelete={deleteLabel} 
            />
            <LabelInputForm
                onCreate={handleCreate}
            />
        </div>
    );
}

export default LabelRoot;
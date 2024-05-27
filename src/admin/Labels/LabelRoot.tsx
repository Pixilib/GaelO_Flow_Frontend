
import React, { useState } from 'react';

import { useCustomToast } from '../../utils/toastify';
import { Button, Card, CardHeader, CardBody, CardFooter, Spinner } from '../../ui';
import { Colors } from '../../utils/enums';


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
    
            <Card>
                <CardHeader title="Labels" color={Colors.primary} />
                <CardBody color={Colors.light}>
                    <div className>
                        <LabelTable
                            data={labels}
                            onEdit={() => {}}
                            onDelete={deleteLabel}
                        />
                        <LabelInputForm
                            onCreate={handleCreate}
                        />
                    </div>
                </CardBody>
                <CardFooter color={Colors.light}></CardFooter>
            </Card>
        );
    }

export default LabelRoot;
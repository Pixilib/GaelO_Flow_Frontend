import React, { useState } from 'react';
import { useCustomToast } from '../../utils/toastify';
import { Button, Card, CardHeader, CardBody, CardFooter, Spinner } from '../../ui';
import { Colors } from '../../utils/enums';
import LabelInputForm from "./LabelInputForm";
import LabelTable from "./LabelTable";

const LabelRoot = () => {
    const { toastSuccess, toastError } = useCustomToast();
    const [labels, setLabels] = useState([]);

    const handleCreate = (newLabel) => {
        setLabels([...labels, { id: labels.length + 1, name: newLabel }]);
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
                    <LabelInputForm onCreate={handleCreate} />
               
                <LabelTable
                    data={labels}
                    onEdit={() => {}}
                    onDelete={deleteLabel}
                />
            </CardBody>
            <CardFooter color={Colors.light} />
        </Card>
    );
};

export default LabelRoot;

import React from 'react';

import { Card, CardHeader, CardBody, CardFooter } from '../../ui';
import { Colors } from '../../utils/enums';

import { useCustomToast } from '../../utils/toastify';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import LabelInputForm from "./LabelInputForm";
import LabelTable from "./LabelTable";

import { getLabels, addLabel, removeLabel } from '../../services/labels';
import { LabelType } from '../../utils/types';


const LabelRoot: React.FC = () => {

    const { toastSuccess, toastError } = useCustomToast();

    const { data: labelsData, isLoading, refetch } = useCustomQuery<LabelType[]>(
        ['labels'],
        () => getLabels(), {
        enabled: true,
    }
    )

    const { mutate: addLabelMutate } = useCustomMutation(addLabel, {
        onSuccess: () => {
            toastSuccess("Label added successfully");
            refetch();
        },
        onError: (error: { message: any; }) => toastError(`Error while creating label: ${error.message}`)
    });

    const { mutate: removeLabelMutate } = useCustomMutation(removeLabel, {
        onSuccess: () => {
            toastSuccess("Label deleted successfully");
            refetch();
        },
        onError: (error: { message: any; }) => toastError(`Error while deleting label: ${error.message}`)
    });

    const handleCreate = (label: string) => {
        addLabelMutate(label);
    };

    const handleDelete = (labelName: string) => {
        removeLabelMutate(labelName);
    };

    return (
        <Card>
            <CardHeader title="Labels" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <LabelInputForm onCreate={handleCreate} />
                <LabelTable
                    data={labelsData || []}
                    onEdit={() => { }}
                    onDeleteLabel={handleDelete}
                    isLoading={isLoading}
                />
            </CardBody>
            <CardFooter color={Colors.light} />
        </Card>
    );
};

export default LabelRoot;

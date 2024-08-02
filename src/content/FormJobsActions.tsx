
import React from 'react';
import { Button } from '../ui';
import { Colors } from '../utils';

import ProgressJobs from '../query/ProgressJobs';
interface FormJobsActionsProps {
    onCancel: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    jobId?: string;
    onJobCompleted?: (jobState: string) => void;
}

const FormJobsActions: React.FC<FormJobsActionsProps> = ({
    onCancel,
    onSubmit,
    jobId,
    onJobCompleted,
}) => {
    if (!jobId) {
        return (
            <div className="flex justify-center mt-4 space-x-4">
                <Button color={Colors.secondary} type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" color={Colors.success} onClick={onSubmit}>
                    Save Changes
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <ProgressJobs jobId={jobId} onJobCompleted={onJobCompleted} />
        </div>
    );
};

export default FormJobsActions;
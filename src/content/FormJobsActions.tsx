

import React from 'react';

import ProgressJobs from '../query/ProgressJobs';
import { Button } from '../ui';
import { Colors } from '../utils';

interface FormJobsActionsProps {
    onCancel: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
    jobId ?: string;
}


const FormJobsActions: React.FC<FormJobsActionsProps> = ({
    onCancel,
    onSubmit,
    jobId,
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
            <ProgressJobs jobId={jobId} />
        </div>
    );
};
export default FormJobsActions; 

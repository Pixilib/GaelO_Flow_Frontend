

import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import ProgressJobs from '../query/ProgressJobs';
import { Button } from '../ui';
import { Colors } from '../utils';
import { resetJob } from '../reducers/JobSlice';
//import { useContent } from '../services/useContent';

interface FormJobsActionsProps {
    onCancel: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

const FormJobsActions: React.FC<FormJobsActionsProps> = ({
    onCancel,
    onSubmit
}) => {
    const { jobId, isCompleted } = useSelector((state: RootState) => state.job);
    const dispatch = useDispatch();
    const { executeSearch } = useContent();

    const handleCloseAndRefresh = () => {
        console.log('handleCloseAndRefresh called');
        dispatch(resetJob());
        executeSearch();
        onCancel();
    };

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

    if (jobId) {
        return (
            <div className="flex justify-center">
                <ProgressJobs jobId={jobId} />
                {isCompleted && (
                        <Button color={Colors.primary} onClick={handleCloseAndRefresh} className="mt-4 text-xs h-14">
                            <FiRefreshCw className="mr-1" />
                            Close and Refresh
                        </Button>
                )}
            </div>
        );
    }

    return null;
};

export default FormJobsActions;
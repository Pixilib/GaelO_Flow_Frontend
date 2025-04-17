import React from 'react';
import { OrthancJob, useCustomQuery } from '../../utils';
import { getJobById } from '../../services/jobs';
import { Badge } from '../../ui';
import { Close } from '../../icons';
import { useDispatch } from 'react-redux';
import { removeJob } from '../../reducers/JobSlice';

type ProgressInlineJobProps = {
    jobId: string;
    onJobCompleted?: (jobStatus: string) => void;
}

const InlineProgressJob: React.FC<ProgressInlineJobProps> = ({ jobId, onJobCompleted }) => {

    const dispatch = useDispatch()

    const { data: jobData, isLoading, error } = useCustomQuery<OrthancJob>(
        ["job", jobId],
        () => getJobById(jobId),
        {
            refetchInterval: (query) => {
                if (query.state.data?.state === 'Success' || query.state.data?.state === 'Failure') {
                    onJobCompleted && onJobCompleted(query.state.data?.state);
                    return false;
                }
                return 1000;
            }
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: </div>;
    if (!jobData) return <div>No job data available</div>;
    const getTextColor = (state: string) => {
        switch (state) {
            case "Pending": return "bg-green-500";
            case "Running": return "bg-warning";
            case "Success": return "bg-green-500";
            case "Failure": return "bg-red-500";
            case "Paused": return "bg-blue-500";
            case "Retry": return "bg-red-500";
            default: return "bg-dark";
        }
    };

    const handleRemoveJob = () => {
        dispatch(removeJob({jobId :jobId}))
    }

    return (
        <Badge className={'flex flex-col '+ getTextColor(jobData.state)}>
            <span className='flex justify-end'><Close onClick={handleRemoveJob}/></span>
            <span>Type : {jobData.type}</span>
            <span>Progress : {jobData.progress}</span>
        </Badge>
    );
};

export default InlineProgressJob;
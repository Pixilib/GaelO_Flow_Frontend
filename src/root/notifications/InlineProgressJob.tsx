import React from 'react';
import { OrthancJob, useCustomQuery } from '../../utils';
import { getJobById } from '../../services/jobs';
import { Badge } from '../../ui';
import { Close } from '../../icons';
import { useDispatch } from 'react-redux';
import { JobType, removeJob } from '../../reducers/JobSlice';
import { ProcessingJob } from '../../utils/types';
import { getProcessingJob } from '../../services/processing';

type ProgressInlineJobProps = {
    jobId: string;
    jobType: JobType;
    onJobCompleted?: (jobStatus: string) => void;
}

const InlineProgressJob: React.FC<ProgressInlineJobProps> = ({ jobId, jobType, onJobCompleted }) => {

    const dispatch = useDispatch()

    const { data: jobData, isLoading, error } = useCustomQuery<OrthancJob | ProcessingJob>(
        ["job", jobId],
        () => (jobType === "orthanc" ? getJobById(jobId) : getProcessingJob(jobId)),
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
            case "waiting": return "bg-waiting";
            case "completed": return "bg-green-500";
            case "failed": return "bg-red-500";
            case "paused": return "bg-blue-500";
            case "active": return "bg-warning";

            case "Pending": return "bg-warning";
            case "Running": return "bg-warning";
            case "Success": return "bg-green-500";
            case "Failure": return "bg-red-500";
            case "Paused": return "bg-blue-500";
            case "Retry": return "bg-red-500";
            default: return "bg-dark";
        }
    };

    const handleRemoveJob = () => {
        dispatch(removeJob(jobId))
    }

    return (
        <Badge className={'flex flex-col ' + getTextColor(jobData.state)}>
            <span className='flex justify-end cursor-pointer'><Close onClick={handleRemoveJob} /></span>
            <span><span className='font-bold underline'>Job state :</span> {jobData.state}</span>
            <span><span className='font-bold underline'>Job type :</span> {jobType} - {jobData.type}</span>
            <span><span className='font-bold underline'>Progress :</span> {jobData.progress} %</span>
        </Badge>
    );
};

export default InlineProgressJob;
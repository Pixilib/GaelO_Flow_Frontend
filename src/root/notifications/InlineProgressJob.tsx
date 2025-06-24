import React, { useState } from 'react';
import { Colors, OrthancJob, useCustomQuery } from '../../utils';
import { getJobById } from '../../services/jobs';
import { Button, ToggleChevron } from '../../ui';
import { Anon, Close, Export, Trash } from '../../icons';
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

    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
            case "waiting": return "bg-warning/20";
            case "completed": return "bg-green-200/90";
            case "failed": return "bg-red-200/90";
            case "paused": return "bg-blue-200/90";
            case "active": return "bg-warning/90";

            case "Pending": return "bg-warning/20";
            case "Running": return "bg-warning/20";
            case "Success": return "bg-green-200/90";
            case "Failure": return "bg-red-200/90";
            case "Paused": return "bg-blue-200/90";
            case "Retry": return "bg-red-200/90";
        }
    };

    const handleRemoveJob = () => {
        dispatch(removeJob(jobId))
    }

    const handleAnonymizeClick = () => {}

    const handleExportClick = () => {}

    const handleDeleteClick = () => {
    }

    return (
        // <Badge className={'flex flex-col ' + getTextColor(jobData.state)}>
        //     <span className='flex justify-end cursor-pointer'><Close onClick={handleRemoveJob} /></span>
        //     <span><span className='font-bold underline'>Job state :</span> {jobData.state}</span>
        //     <span><span className='font-bold underline'>Job type :</span> {jobType} - {jobData.type}</span>
        //     <span><span className='font-bold underline'>Progress :</span> {jobData.progress} %</span>
        // </Badge>
        <button
            className={`flex flex-col gap-2 cursor-pointer border border-gray-400 p-2 rounded-lg text-gray-600 ${getTextColor(jobData.state)} hover:border-blue-300`}
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
            <div className='flex flex-col items-start w-full'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p className='font-bold text-sm'>Job {jobData.type} is {jobData.state}</p>
                    <button
                        className='cursor-pointer transition-transform duration-150 hover:scale-125'
                        onClick={handleRemoveJob}
                    >
                        <Close className="w-3.5 h-3.5" />
                    </button>
                </div>
                <p className='text-xs font-semibold'>Progress {jobData.progress}%</p>
                <div className='flex flex-row items-center justify-between w-full '>
                    <p className='text-xs font-semibold'>Click to see details</p>
                    <ToggleChevron isOpen={isDetailsOpen} className="w-3.5 h-3.5 mr-1" />
                </div>
            </div>
            {isDetailsOpen && (
                <>
                    <div className='border-b border-gray-700 w-full' />
                    <div className='w-full flex justify-around'>
                        <Button
                            color={Colors.blueCustom}
                            children={<Anon className='w-10 h-10'/>}
                            className='rounded-xl w-10 h-10'
                            onClick={e => {e.stopPropagation(); handleAnonymizeClick()}}
                        />
                        <Button
                            color={Colors.warning}
                            children={<Export />}
                            className='rounded-xl w-10 h-10'
                            onClick={e => {e.stopPropagation(); handleExportClick()}}
                        />
                        <Button
                            color={Colors.danger}
                            children={<Trash />}
                            className='rounded-xl w-10 h-10'
                            onClick={e => {e.stopPropagation(); handleDeleteClick()}}
                        />
                    </div>
                </>
            )}
        </button>
    );
};

export default InlineProgressJob;
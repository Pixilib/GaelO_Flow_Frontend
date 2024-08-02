import React from 'react';
import { useCustomQuery } from "../utils";
import { OrthancJob } from "../utils/types";
import { getJobById } from "../services/jobs";
import { ProgressCircle } from "../ui";

type ProgressJobsProps = {
    jobId: string;
    size?: number;
    onJobCompleted?: (jobStatus: string) => void;
}

const ProgressJobs: React.FC<ProgressJobsProps> = React.memo(({ jobId, size = 84, onJobCompleted  }) => {
    const { data: jobData, isLoading, error } = useCustomQuery<OrthancJob>(
        ["job", jobId],
        () => getJobById(jobId),
        {
            refetchInterval: (query) => {
                if (query.state.data?.State === 'Success' || query.state.data?.State === 'Failure') {
                    onJobCompleted && onJobCompleted(query.state.data?.State);
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
            case "Pending": return "text-green-500";
            case "Running": return "text-warning";
            case "Success": return "text-green-500";
            case "Failure": return "text-red-500";
            case "Paused": return "text-blue-500";
            case "Retry": return "text-red-500";
            default: return "text-dark";
        }
    };
    return (
        <ProgressCircle
            progress={jobData?.Progress ?? 0}
            text={jobData?.State ?? ""}
            className={`${getTextColor(jobData?.State ?? "")} text-[11px]`}
            size={size}
        />
    );
});

export default ProgressJobs;
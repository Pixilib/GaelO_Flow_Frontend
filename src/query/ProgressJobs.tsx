import React from 'react';
import { useCustomQuery } from "../utils";
import { OrthancJob } from "../utils/types";
import { getJobById } from "../services/jobs";
import { ProgressCircle } from "../ui";

type ProgressJobsProps = {
    jobId: string;
    size?: number;
    onJobCompleted?: (job: OrthancJob) => void;
}

const ProgressJobs: React.FC<ProgressJobsProps> = React.memo(({ jobId, size = 84, onJobCompleted  }) => {

    const { data: jobData } = useCustomQuery<OrthancJob>(
        ["job", jobId],
        () => getJobById(jobId),
        {
            refetchInterval: 1000,
            onSuccess: (data) => {
                if (data.State === "Success" || data.State === "Failure") {
                    onJobCompleted && onJobCompleted(data);
                }
            },
        }
    );

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
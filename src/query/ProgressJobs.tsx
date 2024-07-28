import React, { useEffect } from 'react';
import { useCustomQuery } from "../utils";
import { OrthancJob } from "../utils/types";
import { getJobById } from "../services/jobs";
import { ProgressCircle } from "../ui";
import { setJobCompleted } from "../reducers/JobSlice";
import { useDispatch } from "react-redux";

type ProgressJobsProps = {
    jobId: string
    size?: number
}

const ProgressJobs: React.FC<ProgressJobsProps> = ({ jobId,size=84 }) => {
    const dispatch = useDispatch();

    const { data: jobData } = useCustomQuery<OrthancJob>(
        ["job", jobId],
        () => getJobById(jobId),
        {
            refetchInterval: 10000,
        }
    );

    useEffect(() => {
        if (jobData && (jobData.State === "Success" || jobData.State === "Failure")) {
            dispatch(setJobCompleted());
        }
    }, [jobData, dispatch]);

    const getTextColor = (state: string) => {
        switch (state) {
            case "Pending":
                return "text-green-500";
            case "Running":
                return "text-warning";
            case "Success":
                return "text-green-500";
            case "Failure":
                return "text-red-500";
            case "Paused":
                return "text-blue-500";
            case "Retry":
                return "text-red-500";
            default:
                return "text-dark";
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
}

export default ProgressJobs;
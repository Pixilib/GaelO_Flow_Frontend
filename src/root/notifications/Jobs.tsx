import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InlineQueryProgressJob from "./InlineQueryProgressJob";

const Jobs = () => {
    const jobState = useSelector((state: RootState) => state.job);

    return (
        <div className="flex flex-col gap-2 w-60">
            {
                jobState.jobs.length === 0 ?
                (
                    <span className="dark:text-white">Empty list</span>
                ) : (
                    jobState.jobs.map((job) => (
                        <InlineQueryProgressJob key={job.jobId} jobId={job.jobId} jobType={job.jobType} />
                    ))
                )
            }
        </div>
    );
};

export default Jobs;
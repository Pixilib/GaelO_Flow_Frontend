import { useSelector } from "react-redux";
import { RootState } from "../../store";
import InlineProgressJob from "./InlineProgressJob";

const Jobs = ()=> {
    const jobIds = useSelector((state: RootState) => state.job.jobIds);

    return (
        <div>
            {
                jobIds.map(id => {
                    return (
                        <InlineProgressJob key={id} jobId={id}/>
                    )
                })
            }
        </div>
    )
}

export default Jobs
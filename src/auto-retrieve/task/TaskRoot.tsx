import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useCustomQuery } from "../../utils";
import { getExistingQueriesQueues, getQueryQueue } from "../../services/queues";
import { QueryQueue, Queue } from "../../utils/types";
import TaskTable from "./TaskTable";

const TaskRoot = () => {

    const currentUserId = useSelector(
        (state: RootState) => state.user.currentUserId
    );

    const { data: existingRetrieveQueues } = useCustomQuery<string[]>(
        ["queue", "query", currentUserId?.toString() || ""],
        () => getExistingQueriesQueues(currentUserId)
    );

    const firstQueue = existingRetrieveQueues?.[0];

    const { data } = useCustomQuery<QueryQueue[]>(
        ["queue", "retrieve", firstQueue],
        () => getQueryQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: firstQueue != null,
        }
    );
    
    return (
        <>
            <TaskTable  data={data || []} />
        </>
    )
}

export default TaskRoot
import { useSelector } from "react-redux";
import { deleteAnonymizeQueue, getAnonymizeQueue, getExistingAnonymizeQueues } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";
import { AnonQueue } from "../utils/types";
import AnonymizeResultTable from "./AnonymizeResultTable";
import { useMemo } from "react";

type AnonQueuesProps = {
    showResults: boolean
}

const AnonQueues = ({ showResults }: AnonQueuesProps) => {

    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ['queue', 'anonymize', currentUserId?.toString() || ''],
        () => getExistingAnonymizeQueues(currentUserId)
    );

    const firstQueue = existingAnonymizeQueues?.[0]

    const { data, isPending, isFetching } = useCustomQuery<AnonQueue[]>(
        ['queue', 'anonymize', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: (firstQueue != null)
        }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteAnonymizeQueue(firstQueue),
        [['queue', 'anonymize']]
    );

    const anonymizedStudies = useMemo(() => {
        if (!data) return []
        return (data).map(job => job.results)
    }, [data])


    const globalProgress = useMemo(() => {
        if (!data) return 0
        const totalProgress = data.map(job => job.state !== 'wait' ? 1 : 0)
        const sumProgress = totalProgress.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
        return (sumProgress / data.length) * 100
    }, [data])

    //If no queue, nothing to show
    if (!firstQueue) return null
    //if awaiting value show spinner
    if (isPending || isFetching) return <Spinner />;

    return (
        <div className="w-full space-y-4">
            <div
                className="p-4 bg-white border border-gray-100 shadow-inner rounded-xl"
            >
                <ProgressQueueBar progress={globalProgress} onDelete={mutateDeleteQueue} />
            </div>
            {
                showResults && (
                    <AnonymizeResultTable studies={anonymizedStudies} />
                )
            }
        </div>
    );
};

export default AnonQueues;

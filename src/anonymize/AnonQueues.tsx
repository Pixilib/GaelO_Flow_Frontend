import { useSelector } from "react-redux";
import { deleteAnonymizeQueue, getAnonymizeQueue, getExistingAnonymizeQueues } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";
import { AnonQueue } from "../utils/types";
import AnonymizeResultTable from "./AnonymizeResultTable";
import { useMemo, useEffect, useState } from "react";
import ProgressQueueCircle from "../queue/ProgressQueueCircle";

type AnonQueuesProps = {
    showResults: boolean;
    circle?: boolean;
};

const AnonQueues = ({ showResults, circle }: AnonQueuesProps) => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ['queue', 'anonymize', currentUserId?.toString() || ''],
        () => getExistingAnonymizeQueues(currentUserId)
    );

    const firstQueue = existingAnonymizeQueues?.[0];

    const { data, isPending, isFetching } = useCustomQuery<AnonQueue[]>(
        ['queue', 'anonymize', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {
            enabled: !!firstQueue,
        }
    );

    const globalProgress = useMemo(() => {
        if (!data || data.length === 0) return 0;
        const completedJobs = data.filter(job => job.state !== 'wait');
        return (completedJobs.length / data.length) * 100
    }, [data]);

    const [shouldRefetch, setShouldRefetch] = useState(true);

    useEffect(() => {
        if (globalProgress < 100) {
            const interval = setInterval(() => {
                setShouldRefetch(true);
            }, 2000);
            return () => clearInterval(interval);
        } else {
            setShouldRefetch(false);
        }
    }, [globalProgress]);

    const { data: queuedData } = useCustomQuery<AnonQueue[]>(
        ['queue', 'anonymize', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {
            enabled: shouldRefetch && !!firstQueue,
            refetchInterval: shouldRefetch ? 2000 : false,
        }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteAnonymizeQueue(firstQueue),
        [['queue', 'anonymize']]
    );

    const anonymizedStudies = useMemo(() => {
        if (!queuedData) return [];
        return queuedData.map(job => job.results);
    }, [queuedData]);

    // If no queue, nothing to display
    if (!firstQueue) return null;

    // If pending, display the spinner
    if (isPending || isFetching) return <Spinner />;

    return (
        <div className="w-full space-y-4">
            <div className="p-4 bg-white border border-gray-100 shadow-inner rounded-xl">
                {circle ? (
                    <ProgressQueueCircle
                        queueData={{
                            progress: globalProgress,
                            state: queuedData?.[0]?.state || '',
                            id: firstQueue || '',
                            results: queuedData?.[0]?.results,
                            userId: currentUserId || 0,
                        }}
                        onDelete={mutateDeleteQueue}
                        colors={{
                            background: "",
                            progress: ""
                        }}
                    />
                ) : (
                    <ProgressQueueBar progress={globalProgress} onDelete={mutateDeleteQueue} />
                )}
            </div>
            {showResults && <AnonymizeResultTable studies={anonymizedStudies} />}
        </div>
    );
};

export default AnonQueues;

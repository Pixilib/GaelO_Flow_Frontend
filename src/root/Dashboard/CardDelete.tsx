import { useSelector } from "react-redux";
import { Export, Validate } from "../../icons";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";
import { RootState } from "../../store";
import { useCustomMutation, useCustomQuery } from "../../utils";
import { deleteDeleteQueue, getDeleteQueue, getExistingDeleteQueues } from "../../services/queues";
import { Queue } from "../../utils/types";
import { useMemo } from "react";
import ProgressQueueCircle from "../../queue/ProgressQueueCircle";

const CardDelete = () => {

    const currentUserId = useSelector(
        (state: RootState) => state.user.currentUserId
    );

    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ["queue", "delete", currentUserId?.toString() || ""],
        () => getExistingDeleteQueues(currentUserId)
    );

    const firstQueue = existingAnonymizeQueues?.[0];

    const { data } = useCustomQuery<Queue[]>(
        ["queue", "delete", firstQueue],
        () => getDeleteQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: firstQueue != null,
        }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteDeleteQueue(firstQueue),
        [["queue", "delete"]]
    );

    const globalProgress = useMemo(() => {
        if (!data || data.length === 0) return 0;
        const totalJobs = data.length;
        const completedJobs = data.filter(
            (job) => job.state === "completed" || job.state === "failed"
        ).length;
        return totalJobs === 0 ? 0 : (completedJobs / totalJobs) * 100;
    }, [data]);

    return (
        <Card className="flex-1 bg-white overflow-hidden rounded-lg shadow-lg md:max-w-md dark:bg-neutral-500">
            <CardHeader centerTitle color={Colors.danger} className="flex items-center">
                <Export className="mr-3 text-xl text-white " />
                <span className="text-lg font-bold text-white">Delete</span>
            </CardHeader>

            <CardBody
                className="flex flex-col items-center justify-center p-6 dark:bg-neutral-500 bg-gray-50"
                color={Colors.light}
            >
                {firstQueue ? (
                    <ProgressQueueCircle
                        onDelete={() => mutateDeleteQueue({})}
                        queueData={{
                            progress: globalProgress,
                            state: "",
                            id: "",
                            results: undefined,
                            userId: currentUserId || 0,
                        }}
                        colors={{ background: "text-gray-300", progress: Colors.primary }}
                    />
                ) : (
                    <Validate className='text-success h-10 w-10' />
                )}
            </CardBody>
            <CardFooter className="flex justify-center dark:bg-neutral-500" color={Colors.white}>
            </CardFooter>
        </Card>
    );
};

export default CardDelete;

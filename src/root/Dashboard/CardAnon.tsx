import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";
import { useSelector } from "react-redux";
import { getExistingAnonymizeQueues, getAnonymizeQueue } from "../../services/queues";
import { useCustomQuery } from "../../utils";
import { useMemo } from "react";
import ProgressQueueCircle from "../../queue/ProgressQueueCircle";
import { Spinner } from "../../ui";
import { AnonQueue } from "../../utils/types";

const CardAnon = () => {
    const currentUserId = useSelector((state) => state.user.currentUserId);

    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ['queue', 'anonymize', currentUserId?.toString() || ''],
        () => getExistingAnonymizeQueues(currentUserId)
    );

    const firstQueue = existingAnonymizeQueues?.[0];

    const { data, isPending, isFetching } = useCustomQuery<AnonQueue[]>(
        ['queue', 'anonymize', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: !!firstQueue,
        }
    );

    const globalProgress = useMemo(() => {
        if (!data || data.length === 0) return 0;

        const totalJobs = data.length;
        const completedJobs = data.filter(job => job.state === 'completed' || job.state === 'in progress').length;

        return (totalJobs === 0) ? 0 : (completedJobs / totalJobs) * 100;
    }, [data]);

    useCustomQuery<AnonQueue[]>(['queue', 'anonymize', firstQueue], () => getAnonymizeQueue(firstQueue), {
        refetchInterval: globalProgress < 100 ? 2000 : false,
        enabled: !!firstQueue,
    });

    // If no queue is found, display nothing
    if (!firstQueue) return null;
    // If data is loading, display a spinner
    if (isPending || isFetching) return <Spinner />;

    return (
        <Card className="flex-1">
            <CardHeader centerTitle title="Anonymisation" color={Colors.blueCustom} />
            <CardBody className="flex items-center justify-center" color={Colors.white}>
                <ProgressQueueCircle
                    onDelete={() => { }}
                    queueData={{
                        progress: globalProgress,
                        state: "",
                        id: "",
                        results: undefined,
                        userId: currentUserId || 0
                    }}
                    colors={{ background: 'text-gray-300', progress: Colors.primary }}
                />
            </CardBody>
            <CardFooter color={Colors.lightGray}>
                <Button className="self-center" color={Colors.blueCustom}>
                    Empty List
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CardAnon;

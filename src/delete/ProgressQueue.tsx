import { deleteDeleteQueue, getDeleteQueue } from "../services/queues"
import { Colors, useCustomMutation, useCustomQuery } from "../utils"
import { Button, ProgressCircle, Spinner } from "../ui"

type ProgressQueueProps = {
    uuid: string
}
const ProgressQueue = ({ uuid }: ProgressQueueProps) => {
    const { data, isPending } = useCustomQuery(['queue', 'delete', uuid], () => getDeleteQueue(uuid), {refetchInterval : 2000})
    const {mutate : mutateDeleteQueue} = useCustomMutation(
        ()=> deleteDeleteQueue(uuid), 
        [['queue', 'delete']]
    )

    if (isPending) return <Spinner />

    return (
        <div>
            <ProgressCircle text={data?.state} progress={data?.progress || 0} />
            <Button color={Colors.danger} onClick={() =>  mutateDeleteQueue({})}></Button>
        </div>
    )
}

export default ProgressQueue
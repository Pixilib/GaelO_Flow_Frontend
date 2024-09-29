import { useSelector } from "react-redux"
import { getExistingDeleteQueues } from "../services/queues"
import { useCustomQuery } from "../utils"
import { RootState } from "../store"
import { Spinner } from "../ui"
import ProgressQueue from "./ProgressQueue"


const DeleteQueues = () => {

    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const {data : existingDeleteQueues, isPending } = useCustomQuery<string[]>(['queue', 'delete', currentUserId.toString()], () => getExistingDeleteQueues(currentUserId))

    if(isPending) return <Spinner/>

    return (
        <div>
            <p>Progress Queue</p>
            {
            existingDeleteQueues?.map((uuid)=>{
                return <ProgressQueue uuid={uuid} />
            })
            }
        </div>
    )
}

export default DeleteQueues
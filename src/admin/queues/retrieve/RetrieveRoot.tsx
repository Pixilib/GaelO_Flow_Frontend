import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../../utils";

import { getOptions } from "../../../services";
import { Button, Spinner } from "../../../ui";

import RetrieveOptions from "./RetrieveOptions";
import RetrieveQueues from "./RetrieveQueues";
import { Options } from "../../../utils/types";
import { Trash, Pause, Play } from "../../../icons";
import { deleteQueryQueue, pauseQueryQueue, resumeQueryQueue } from "../../../services/queues";

const RetrieveRoot = () => {
    const { data: options, isPending: isLoadingOptions } = useCustomQuery<Options>(["options"], () => getOptions());
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteQueryQueue(),
        [["queue", "query"]],
        {
            onError: (e: any) => {
                toastError(e?.data?.message);
            },

            onSuccess: () => {
                toastSuccess("Delete Queue with success");
            }
        }
    );

    const { mutate: mutatePauseQueue } = useCustomMutation(
        () => pauseQueryQueue(),
        [["queue", "query", "pause"]],
        {
            onError: (e: any) => {
                toastError(e?.data?.message);
            },

            onSuccess: () => {
                toastSuccess("Pause Queue with success");
            }
        }
    );

    const { mutate: mutateResumeQueue } = useCustomMutation(
        () => resumeQueryQueue(),
        [["queue", "query", "resume"]],
        {
            onError: (e: any) => {
                toastError(e?.data?.message);
            },

            onSuccess: () => {
                toastSuccess("Resume Queue with success");
            }
        }
    );

    if (isLoadingOptions) return <Spinner />;

    return (
        <div className="flex flex-col gap-3">
            <RetrieveOptions data={options} />
            <RetrieveQueues />
            <div className="flex justify-end gap-5">
                <Button onClick={() => mutateResumeQueue({})} color={Colors.success}><Play /></Button>
                <Button onClick={() => mutatePauseQueue({})} color={Colors.primary}><Pause /></Button>
                <Button onClick={() => mutateDeleteQueue({})} color={Colors.danger}><Trash /></Button>
            </div>
        </div>
    )
}

export default RetrieveRoot;
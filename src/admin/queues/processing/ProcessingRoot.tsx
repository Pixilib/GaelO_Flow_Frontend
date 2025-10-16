import { Colors, useCustomMutation, useCustomToast } from "../../../utils";

import { Button } from "../../../ui";

import ProcessingQueues from "./ProcessingQueues";
import { Pause, Play, Trash } from "../../../icons";
import { deleteProcessingJobs, pauseProcessingJobs, resumeProcessingJobs } from "../../../services/queues";

const ProcessingRoot = () => {
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteProcessingJobs(),
        [["queue", "processing", "delete"]],
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
        () => pauseProcessingJobs(),
        [["queue", "processing", "pause"]],
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
        () => resumeProcessingJobs(),
        [["queue", "processing", "resume"]],
        {
            onError: (e: any) => {
                toastError(e?.data?.message);
            },

            onSuccess: () => {
                toastSuccess("Resume Queue with success");
            }
        }
    );

    return (
        <div className="flex flex-col gap-3">
            <ProcessingQueues />
            <div className="flex justify-end gap-5">
                <Button data-gaelo-flow="processing-buttonPlay" onClick={() => mutateResumeQueue({})} color={Colors.success}><Play /></Button>
                <Button data-gaelo-flow="processing-buttonPause" onClick={() => mutatePauseQueue({})} color={Colors.primary}><Pause /></Button>
                <Button data-gaelo-flow="processing-buttonDelete" onClick={() => mutateDeleteQueue({})} color={Colors.danger}><Trash /></Button>
            </div>
        </div>
    )
}
export default ProcessingRoot;
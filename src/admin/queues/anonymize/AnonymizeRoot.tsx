import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../../utils";

import { getOptions } from "../../../services";
import { Button, Spinner } from "../../../ui";

import AnonymizeQueues from "./AnonymizeQueues";
import { Options } from "../../../utils/types";
import { Pause, Play, Trash } from "../../../icons";
import { deleteAnonymizeQueue, pauseAnonymizeQueue, resumeAnonymizeQueue } from "../../../services/queues";
import { useState } from "react";

const AnonymizeRoot = () => {
    const { data: options, isPending: isLoadingOptions } = useCustomQuery<Options>(["options"], () => getOptions());
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteAnonymizeQueue(),
        [["queue", "anonymize"]],
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
        () => pauseAnonymizeQueue(),
        [["queue", "anonymize", "pause"]],
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
        () => resumeAnonymizeQueue(),
        [["queue", "anonymize", "resume"]],
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
            <AnonymizeQueues />
            <div className="flex justify-end gap-5">
                <Button onClick={() => mutateResumeQueue({})} color={Colors.success}><Play /></Button>
                <Button onClick={() => mutatePauseQueue({})} color={Colors.primary}><Pause /></Button>
                <Button onClick={() => mutateDeleteQueue({})} color={Colors.danger}><Trash /></Button>
            </div>
        </div>
    )
}
export default AnonymizeRoot;
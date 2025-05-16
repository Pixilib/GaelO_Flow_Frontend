import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../../utils";

import { getOptions } from "../../../services";
import { Button, Spinner, Toggle } from "../../../ui";

import AnonymizeQueues from "./AnonymizeQueues";
import { AnonymizeOptionPayload, Options } from "../../../utils/types";
import { Pause, Play, Trash } from "../../../icons";
import { deleteAnonymizeQueue, pauseAnonymizeQueue, resumeAnonymizeQueue } from "../../../services/queues";
import { useMemo, useState } from "react";
import { updateAnonymizeOptions } from "../../../services/options";

const AnonymizeRoot = () => {
    const { data: options, isPending: isLoadingOptions } = useCustomQuery<Options>(["options"], () => getOptions());
    const { toastSuccess, toastError } = useCustomToast();
    const [keepLabel, setKeepLabel] = useState<boolean>();

    useMemo(() => {
        if (options)
            setKeepLabel(options.keepLabel);
    }, [options]);

    console.log("options", options);

    const {mutate: mutateUpdateAnonymizeOptions} = useCustomMutation(
        (anonymizeOptions: AnonymizeOptionPayload) => updateAnonymizeOptions(anonymizeOptions),
        [["options"]],
        {
            onError: (e: any) => {
                toastError(e?.data?.message);
            },
            onSuccess: () => {
                setKeepLabel(!keepLabel);
            }
        },
    );

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

    const handleKeepLabelChange = () => {
        mutateUpdateAnonymizeOptions({ anonymizeKeepLabels: !keepLabel });
    }

    if (isLoadingOptions) return <Spinner />;

    return (
        <div className="flex flex-col gap-3">
            <AnonymizeQueues />
            <div className="flex justify-between items-center">
                <Toggle
                    onChange={handleKeepLabelChange}
                    checked={keepLabel}
                    label="Auto Anonymize"
                    labelPosition="right"
                />
                <div className="flex justify-end gap-5">
                    <Button onClick={() => mutateResumeQueue({})} color={Colors.success}><Play /></Button>
                    <Button onClick={() => mutatePauseQueue({})} color={Colors.primary}><Pause /></Button>
                    <Button onClick={() => mutateDeleteQueue({})} color={Colors.danger}><Trash /></Button>
                </div>
            </div>
        </div>
    )
}
export default AnonymizeRoot;
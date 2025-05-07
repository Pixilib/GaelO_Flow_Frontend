import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import { deleteQueryQueue, getExistingQueriesQueues, getQueryQueue, pauseQueryQueue, resumeQueryQueue } from "../../services/queues";
import { QueryQueue } from "../../utils/types";
import TaskTable from "./TaskTable";
import { useState } from "react";
import { Button } from "../../ui";
import { Anon, Export, Pause, Play, Trash } from "../../icons";
import {
    addStudyIdToDeleteList,
    addSeriesOfStudyIdToExportList,
    addStudyIdToAnonymizeList,
    addSeriesToExportListFromSeriesId,
} from "../../utils/actionsUtils";

const TaskRoot = () => {
    const { toastSuccess, toastError } = useCustomToast();

    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

    const currentUserId = useSelector(
        (state: RootState) => state.user.currentUserId
    );

    const { data: existingRetrieveQueues } = useCustomQuery<string[]>(
        ["queue", "query", currentUserId?.toString() || ""],
        () => getExistingQueriesQueues(currentUserId)
    );

    const firstQueue = existingRetrieveQueues?.[0];

    const { data } = useCustomQuery<QueryQueue[]>(
        ["queue", "retrieve", firstQueue],
        () => getQueryQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: firstQueue != null,
        }
    );

    const getSelectedData = () => {
        const selectedIds = Object.keys(selectedRows)
        return data.filter(item => selectedIds.includes(item.id))
    }

    const handleSendAnonymizeList = async () => {
        const selectedData = getSelectedData();
        for (const item of selectedData) {
            if (!item.results) continue;
            if (item.results.Type === "Study")
                await addStudyIdToAnonymizeList(item.results.ID);
            if (item.results.Type === "Series")
                await addStudyIdToAnonymizeList(item.results.ParentStudy);
        }
    };

    const handleSendExportList = async () => {
        const selectedData = getSelectedData();
        for (const item of selectedData) {
            if (!item.results) continue;
            if (item.results.Type === "Study")
                await addSeriesOfStudyIdToExportList(item.results.ID);
            if (item.results.Type === "Series")
                await addSeriesToExportListFromSeriesId(item.results.ID);
        }
    };

    const handleSendDeleteList = async () => {
        const selectedData = getSelectedData();
        for (const item of selectedData) {
            if (!item.results) continue;
            if (item.results.Type === "Study")
                await addStudyIdToDeleteList(item.results.ID);
            if (item.results.Type === "Series")
                await addStudyIdToDeleteList(item.results.ParentStudy);
        }
    };

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

    const onRowSelectionChange = (rowSelection: Record<string, boolean>) => {
        setSelectedRows(rowSelection);
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 pl-3 pr-3">
                <Button
                    color={Colors.blueCustom}
                    className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                    onClick={handleSendAnonymizeList}
                >
                    <Anon className="text-xl" />
                    <span className="ml-2">Send to Anonymize</span>
                </Button>

                <Button
                    color={Colors.secondary}
                    className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                    onClick={handleSendExportList}
                >
                    <Export className="text-xl" />
                    <span className="ml-2">Send to Export</span>
                </Button>

                <Button
                    color={Colors.danger}
                    className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                    onClick={handleSendDeleteList}
                >
                    <Export className="text-xl" />
                    <span className="ml-2">Send to Delete</span>
                </Button>
            </div>
            <TaskTable
                data={data || []}
                selectedRows={selectedRows}
                onRowSelectionChange={onRowSelectionChange}
            />
            <div className="flex justify-end gap-5 pr-3">
                <Button onClick={() => mutateResumeQueue({})} color={Colors.success}><Play /></Button>
                <Button onClick={() => mutatePauseQueue({})} color={Colors.primary}><Pause /></Button>
                <Button onClick={() => mutateDeleteQueue({})} color={Colors.danger}><Trash /></Button>
            </div>
        </div>
    )
}

export default TaskRoot
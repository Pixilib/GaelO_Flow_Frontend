import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Colors, useCustomQuery } from "../../utils";
import { getExistingQueriesQueues, getQueryQueue } from "../../services/queues";
import { QueryQueue } from "../../utils/types";
import TaskTable from "./TaskTable";
import { useState } from "react";
import { Button } from "../../ui";
import { Anon, Export, Trash } from "../../icons";
import {
    
    addStudyIdToDeleteList,
    addSeriesOfStudyIdToExportList,
    addStudyIdToAnonymizeList,
    addSeriesToExportListFromSeriesId,
} from "../../utils/actionsUtils";
import { useTranslation } from "react-i18next";

const TaskRoot = () => {

    const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
    const {t} = useTranslation()


    const currentUserId = useSelector(
        (state: RootState) => state.user.currentUserId
    );

    const role = useSelector(
        (state: RootState) => state.user.role
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

    const onRowSelectionChange = (rowSelection: Record<string, boolean>) => {
        setSelectedRows(rowSelection);
    }

    return (
        <>
            <div data-gaelo-flow="robot-buttons" className="flex flex-wrap gap-2 pl-3 pr-3 pb-3">
                {role.anonymize &&
                    <Button
                        color={Colors.blueCustom}
                        className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendAnonymizeList}
                    >
                        <Anon className="text-xl" />
                        <span className="ml-2">{t("buttons.send-to-anonymize")}</span>
                    </Button>
                }
                {role.export &&
                    <Button
                        color={Colors.secondary}
                        className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendExportList}
                    >
                        <Export className="text-xl" />
                        <span className="ml-2">{t("buttons.send-to-export")}</span>
                    </Button>
                }
                {role.delete &&
                    <Button
                        color={Colors.danger}
                        className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                        onClick={handleSendDeleteList}
                    >
                        <Trash className="text-xl" />
                        <span className="ml-2">{t("buttons.send-to-delete")}</span>
                    </Button>
                }
            </div >
            <div data-gaelo-flow="robot-datatable">
            <TaskTable
                data={data || []}
                selectedRows={selectedRows}
                onRowSelectionChange={onRowSelectionChange}
            />
            </div>
        </>
    )
}

export default TaskRoot
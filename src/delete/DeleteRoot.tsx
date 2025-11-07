import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../store";
import DeleteStudyTable from "./DeleteStudyTable";
import { flushDeleteList } from "../reducers/DeleteSlice";
import { Colors, useCustomMutation } from "../utils";
import { createDeleteQueue } from "../services/queues";
import DeleteQueues from "./DeleteQueues";
import { Button, Card, CardHeader, CardBody, CardFooter } from "../ui";
import { Trash, Empty } from "../icons";
import { useTranslation } from "react-i18next";
import DeleteTour from "../tour/tours/DeleteTour";

const DeleteRoot = () => {
    const dispatch = useDispatch();
    const deleteList = useSelector((state: RootState) => state.delete.studies);
    const { t } = useTranslation()

    const handleClearList = () => {
        dispatch(flushDeleteList());
    };

    const handleDeleteFinished = () => {
        handleClearList()
    };

    const { mutate: mutateDelete } = useCustomMutation(
        ({ seriesIds }) => createDeleteQueue(seriesIds),
        [[]]
    );

    const handleDeleteList = () => {
        const seriesIds = Object.values(deleteList)
            .map((study) => study.series)
            .flat();
        mutateDelete({ seriesIds });
    };

    return (
        <Card>
            <div className="w-full flex justify-end m-1">
                <DeleteTour />
            </div>
            <CardHeader color={Colors.primary}>
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">
                        {t("delete.delete-resources")}
                    </div>
                    <div className="flex justify-end w-1/5 gap-3 p-3">
                        <Button
                            data-gaelo-flow="delete-clear-button"
                            onClick={handleClearList}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary dark:bg-slate-700"
                        >
                            <Empty className="text-xl text-bold text-primary dark:text-white group-hover:text-white" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody
                color={Colors.almond}
                className="dark:bg-neutral-500">
                <div data-gaelo-flow="delete-study-table">
                    <DeleteStudyTable
                        studies={Object.values(deleteList)} />
                </div>
            </CardBody>
            <CardFooter
                color={Colors.light}
                className="dark:bg-slate-950">
                <div className="flex flex-col items-center justify-center gap-3 m-3">
                    <Button
                        data-gaelo-flow="delete-delete-button"
                        onClick={handleDeleteList}
                        color={Colors.danger}
                        className="flex items-center justify-center"
                    >
                        <Trash />
                        <span className="ml-2">Execute Deletion</span>
                    </Button>
                    <DeleteQueues onFinish={handleDeleteFinished} />
                </div>
            </CardFooter>

        </Card>
    );
};
export default DeleteRoot;

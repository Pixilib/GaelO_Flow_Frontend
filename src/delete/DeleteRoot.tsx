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

const DeleteRoot = () => {
    const dispatch = useDispatch();
    const deleteList = useSelector((state: RootState) => state.delete.studies);
    const [queueUuid, setQueueUuid] = useState<string | null>(null);

    const handleClearList = () => {
        dispatch(flushDeleteList());
    };

    const { mutate: mutateDelete } = useCustomMutation(
        ({ seriesIds }) => createDeleteQueue(seriesIds),
        [[]],
        {
            onSuccess: (uuid) => {
                console.log("Queue created with UUID:", uuid);
                setQueueUuid(uuid);
            },
        }
    );

    const handleDeleteList = () => {
        const seriesIds = Object.values(deleteList)
            .map((study) => study.series)
            .flat();
        mutateDelete({ seriesIds });
    };

    return (
        <Card>
            <CardHeader color={Colors.primary}>
                <div className="flex items-center w-full">
                    <div className="w-4/5 text-lg font-bold text-center">
                        Delete Resources
                    </div>
                    <div className="flex justify-end w-1/5 gap-3 p-3">
                        <Button
                            onClick={handleClearList}
                            color={Colors.light}
                            className="rounded-lg hover:bg-secondary group"
                        >
                            <Empty className="text-xl text-bold text-primary group-hover:text-white" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody color={Colors.almond}>
                <DeleteStudyTable
                    studies={Object.values(deleteList)} />
            </CardBody>
            <CardFooter color={Colors.light}>
                <div className="flex items-center justify-center gap-3">
                    <div>
                        <Button
                            onClick={handleDeleteList}
                            color={Colors.danger}
                            className="flex items-center justify-center"
                        >
                            <Trash />
                            <span className="ml-2">Delete List</span>
                        </Button>
                    </div>
                    <div>
                        <DeleteQueues />
                    </div>
                </div>
            </CardFooter>

        </Card>
    );
};
export default DeleteRoot;

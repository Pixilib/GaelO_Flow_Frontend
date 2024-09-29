import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import DeleteStudyTable from "./DeleteStudyTable";
import { flushDeleteList } from "../reducers/DeleteSlice";
import { Button, Card, CardHeader, CardBody, CardFooter } from "../ui";
import { Colors, useCustomMutation } from "../utils";
import { createDeleteQueue } from "../services/queues";
import { useState } from "react";
import ProgressQueue from "./ProgressQueue";
import DeleteQueues from "./DeleteQueues";

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
                setQueueUuid(uuid)
            },
        }
    )

    const handleDeleteList = () => {
        const seriesIds = Object.values(deleteList).map((study) => study.series).flat();
        mutateDelete({ seriesIds });
    }

    return (
        <Card>
            <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={"Delete"}
            />
            <CardBody color={Colors.almond}>
                <DeleteStudyTable studies={Object.values(deleteList)} />
            </CardBody>
            <CardFooter color={Colors.light} className="flex justify-center gap-3">
                <Button
                    onClick={handleClearList}
                    color={Colors.warning}
                >
                    Empty List
                </Button>
                <Button
                    onClick={handleDeleteList}
                    color={Colors.danger}
                >
                    Delete List
                </Button>
                <DeleteQueues />
            </CardFooter>
        </Card>
    );
};


export default DeleteRoot;

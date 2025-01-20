import { Colors, useCustomMutation, useCustomQuery } from "../../../utils";

import { getOptions } from "../../../services";
import { Button, Spinner } from "../../../ui";

import RetrieveOptions from "./RetrieveOptions";
import RetrieveQueues from "./RetrieveQueues";
import { Options } from "../../../utils/types";
import { Trash } from "../../../icons";
import { deleteQueryQueue } from "../../../services/queues";

const RetrieveRoot = () => {
    const { data: options, isPending: isLoadingOptions } = useCustomQuery<Options>(["options"], () => getOptions());
    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteQueryQueue(),
        [["queue", "query"]]
    );

    if (isLoadingOptions) return <Spinner />;

    return (
        <div className="flex flex-col gap-3">
            <RetrieveOptions data={options} />
            <RetrieveQueues />
            <div className="flex justify-end">
                <Button onClick={()=> mutateDeleteQueue({})} color={Colors.danger} ><Trash/></Button>
            </div>
        </div>
    )
}
export default RetrieveRoot;
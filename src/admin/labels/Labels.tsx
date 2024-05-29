import { deleteLabels, getLabels, postLabels } from "../../services/labels";
import { Card, CardHeader, CardBody} from "../../ui";
import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";
import LabelsTable from './LabelsTable';
import LabelsManager from './LabelsManager';



const Labels = () => {
    const { toastSuccess, toastError } = useCustomToast();
    const { data: labels, isPending: isLoadingLabels } = useCustomQuery<string[]>(
        ["labels"],
        () => getLabels(),
        {
            enabled: true,
        }
    );
    const postLabelMutation = useCustomMutation<void, string>(
        (label: string) => postLabels(label),
        [["labels"]],
        {
            onSuccess: () => {
                toastSuccess("Label created with success");
            },
            onError: () => {
                toastError("Label creation failed");
            },
        }
    );
    console.log({ labels })
    const deleteLabelMutation = useCustomMutation<void, string>(
        (label: string) => deleteLabels(label),
        [["labels"]],
        {
            onSuccess: () => {
                toastSuccess("Label deleted with success");
            },
            onError: () => {
                toastError("Label deletion failed");
            },
        }
    );
    const confirmDelete = (label: string) => {
        const confirm = window.confirm(`Are you sure you want to delete the label ${label} ?`);
        if (confirm) {
            deleteLabelMutation.mutate(label);
        }
    };

    const tableData = labels ? labels.map((label, index) => ({ id: index, label })) : [];
    console.log({ tableData })
    return (
        <div className="flex justify-center w-full h-full mt-12">
            <Card className="w-full bg-[#EFEFEF]">
                <CardHeader title="Labels" color={Colors.primary} />
                <CardBody>
                    <LabelsTable data={tableData} onDelete={confirmDelete} />
                </CardBody>
            </Card>
            <LabelsManager />
        </div>
    );
}
export default Labels;
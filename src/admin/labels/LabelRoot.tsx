import React from "react";
import { Card, CardBody, CardFooter, CardHeader } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getLabels, addLabel, removeLabel, getRoles } from "../../services";
import { Label, Role } from "../../utils/types";
import LabelInputForm from "./LabelInputForm";
import LabelTable from "./LabelTable";

const LabelRoot: React.FC = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const { data: labelsData } = useCustomQuery<Label[]>(["labels"], () => getLabels());
  useCustomQuery<Role[]>(["roles"], () => getRoles());

  const { mutate: mutateAddLabel } = useCustomMutation<void, Label>(
    ({ name }) => addLabel(name),
    [["labels"]],
    {
      onSuccess: () => {
        toastSuccess("Label added successfully");
      },
      onError: (error: any) =>
        toastError(`Error while creating label should contain only alphanumeric characters`),
    }
  );

  const { mutate: mutateRemoveLabel } = useCustomMutation<void, string>(
    (labelName: string) => removeLabel(labelName),
    [["labels"]],
    {
      onSuccess: () => {
        toastSuccess("Label deleted successfully");
      },
      onError: (error: any) =>
        toastError(`Error deleting Label ${error?.message}`),
    }
  );

  const handleCreate = (payload: Label) => {
    mutateAddLabel(payload);
  };

  const handleDelete = (labelName: string) => {
    mutateRemoveLabel(labelName);
  };

  return (
    <Card>
      <CardHeader centerTitle color={Colors.primary} title={"Manage Labels"} />
      <CardBody
        color={Colors.almond}
        className="dark:bg-neutral-500 rounded-br-2xl rounded-bl-2xl">
        <LabelInputForm onCreateLabel={(label) => handleCreate({ name: label })} />

        <div className="mt-5">
          <LabelTable
            data={labelsData ?? []} onDeleteLabel={handleDelete} />
        </div>
      </CardBody>
    </Card>
  );
};

export default LabelRoot;

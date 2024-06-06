import React from "react";

import { Card, CardHeader, CardBody, CardFooter } from "../../ui";
import { Colors } from "../../utils/enums";

import { useCustomToast } from "../../utils/toastify";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getLabels, addLabel, removeLabel } from "../../services/labels";
import { Label, Role } from "../../utils/types";

import LabelInputForm from "./LabelInputForm";
import LabelTable from "./LabelTable";
import { getRoles } from "../../services/users";

const LabelRoot: React.FC = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const { data: labelsData } = useCustomQuery<Label[]>(["labels"], () =>
    getLabels()
  );

  const { data: roles } = useCustomQuery<Role[]>(
    ["roles"],
    () => getRoles()
  );

  const { mutate: addLabelMutate } = useCustomMutation<void, Label>(
    (name) => addLabel(name),
    [["labels"]],
    {
      onSuccess: () => {
        toastSuccess("Label added successfully");
      },
      onError: (error: any) =>
        toastError(`Error while creating label: ${error?.message}`),
    }
  );

  const { mutate: removeLabelMutate } = useCustomMutation(
    ({ name }) => removeLabel(name),
    [["labels"]],
    {
      onSuccess: () => {
        toastSuccess("Label deleted successfully");
      },
      onError: (error: any) =>
        toastError(`Error while deleting label: ${error.message}`),
    }
  );

  const handleCreate = (payload: Label) => {
    addLabelMutate(payload );
  };

  const handleDelete = (labelName: string) => {
    removeLabelMutate({ name: labelName });
  };

  return (
    <Card>
      <CardHeader title="Labels" color={Colors.primary} />
      <CardBody color={Colors.light}>
        <LabelInputForm onCreateLabel={handleCreate} />
        <LabelTable data={labelsData || []} onDeleteLabel={handleDelete} />
      </CardBody>
      <CardFooter color={Colors.light} />
    </Card>
  );
};

export default LabelRoot;

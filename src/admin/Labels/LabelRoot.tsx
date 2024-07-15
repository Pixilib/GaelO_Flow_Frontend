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

  const { data: labelsData } = useCustomQuery<string[], Label[]>(["labels"],
    () => getLabels(),
    {
      select: (name) => name.map((label) => ({ Name: label })
      )
    }
  );

  useCustomQuery<Role[]>(
    ["roles"],
    () => getRoles()
  );

  const { mutate: mutateAddLabel } = useCustomMutation<void, Label>(
    (label: Label) => addLabel(label),
    [["labels"]],
    {
      onSuccess: () => {
        toastSuccess("Label added successfully");
      },
      onError: (error: any) =>
        toastError(`Error while creating label: ${error?.message}`),
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
        toastError(`Error while deleting label: ${error?.message}`),
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
      <CardHeader
        className="flex items-center justify-center rounded-t-lg text-bg-light"
        color={Colors.primary}
        title={'Manage Labels'}
      />
      <CardBody color={Colors.almond} roundedTopLeft roundedTopRight>
        <div className="mt-8 mb-8">
          <LabelInputForm onCreateLabel={handleCreate} />
        </div>
        <LabelTable data={labelsData ?? []} onDeleteLabel={handleDelete} />
      </CardBody>
      <CardFooter color={Colors.almond} />
    </Card>
  );
};

export default LabelRoot;

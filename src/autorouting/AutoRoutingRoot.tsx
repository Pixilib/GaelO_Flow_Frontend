import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import AutoRoutingTable from "./table/AutoRoutingTable";
import { createAutoRoutingItem, deleteAutoRoutingItem, getAutoRoutingItems, toggleActivatedAutoRoutingItem } from "../services/autorouting";
import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import { Button } from "../ui";
import { Add } from "../icons";
import CreateRootModal from "./createAutoRouting/CreateRootModal";
import { useState } from "react";

const AutoRoutingRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { mutate: mutateCreateAutoRoutingItem } = useCustomMutation<void>(
    ({ payload }) => createAutoRoutingItem(payload),
    [["autorouting"]],
    {
      onSuccess: () => {
        toastSuccess("AutoRouting item created");
      },
      onError: () => {
        toastError("Unable to create AutoRouting item");
      },
    }
  );

  const { mutate: mutateToggleAutoRoutingItem } = useCustomMutation<void>(
    ({ id, value }) => toggleActivatedAutoRoutingItem(id, value),
    [["autorouting"]],
  );

  const { mutate: mutateDeleteAutoRoutingItem } = useCustomMutation<void>(
    ({ id }: { id: number }) => deleteAutoRoutingItem(id),
    [["autorouting"]],
    {
      onSuccess: () => {
        toastSuccess("AutoRouting item deleted");
      },
      onError: () => {
        toastError("Unable to delete AutoRouting item");
      },
    }
  );

  const { data: autoRoutingItems } = useCustomQuery<AutoRoutingItems[]>(
    ["autorouting"],
    () => getAutoRoutingItems()
  );

  const handleDeleteAutoRoutingItem = (id: number) => {
    mutateDeleteAutoRoutingItem({ id });
  };

  const handleToggleActivate = (id: number, activate: boolean) => {
    mutateToggleAutoRoutingItem({ id: id, value: activate });
  }

  const onSubmit = (payload: AutoRoutingPayload) => {
    mutateCreateAutoRoutingItem({ payload });
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button
          color={Colors.success}
          onClick={() => setShowCreateModal(true)}
          children={
            <div className="flex items-center gap-2">
              <Add />
              <p>Create new rule</p>
            </div>
          }
        />
      </div>
      <AutoRoutingTable
        data={autoRoutingItems}
        onDelete={handleDeleteAutoRoutingItem}
        toggleActivated={handleToggleActivate}
      />
      <CreateRootModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AutoRoutingRoot;

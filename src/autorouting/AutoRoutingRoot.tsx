import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import AutoRoutingTable from "./table/AutoRoutingTable";
import { createAutoRoutingItem, deleteAutoRoutingItem, getAutoRoutingItems, toggleActivatedAutoRoutingItem } from "../services/autorouting";
import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import { Button, Modal } from "../ui";
import { Add } from "../icons";
import CreateRootModal from "./createAutoRouting/CreateRootModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AutoRoutingRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { t } = useTranslation()

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
    setShowCreateModal(false)
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
              <p>{t("autorouting.create-new-rule")}</p>
            </div>
          }
        />
      </div>
      <AutoRoutingTable
        data={autoRoutingItems}
        onDelete={handleDeleteAutoRoutingItem}
        toggleActivated={handleToggleActivate}
      />
      <Modal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        size="xl"
      >
        <CreateRootModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={onSubmit}
        />
      </Modal>

    </div>
  );
};

export default AutoRoutingRoot;

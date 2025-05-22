import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import AutoRoutingTable from "./table/AutoRoutingTable";
import { createAutoRoutingItem, deleteAutoRoutingItem, getAutoRoutingItems } from "../services/autorouting";
import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import { Button } from "../ui";
import { Add } from "../icons";

const AutoRoutingRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();

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
    () => getAutoRoutingItems(),
    {
      onSuccess: (data) => {
        console.log("AutoRouting Items: ", data);
      }
    }
  );

  const handleCreateAutoRoutingItem = () => {
    const payload: AutoRoutingPayload = {
      Name: "New AutoRouting Item",
      EventType: "NewInstance",
      Activated: true,
      Router: {
        RuleCondition: "AND",
        Rules: [
          {
            DicomTag: "PatientName",
            ValueRepresentation: "string",
            Value: "John Doe",
            Condition: "EQUALS",
          },
        ],
        Destinations: [
          {
            Destination: "AET",
            Name: "ORTHANC",
          },
        ],
      },
    }

    mutateCreateAutoRoutingItem({ payload });
  };

  const handleDeleteAutoRoutingItem = (id: number) => {
    mutateDeleteAutoRoutingItem({ id });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button
          color={Colors.success}
          onClick={handleCreateAutoRoutingItem}
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
      />
    </div>
  );
};

export default AutoRoutingRoot;

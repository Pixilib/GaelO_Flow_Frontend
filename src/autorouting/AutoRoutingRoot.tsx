import { Colors, useCustomMutation, useCustomQuery, useCustomToast } from "../utils";
import AutoRoutingTable from "./table/AutoRoutingTable";
import { createAutoRoutingItem, getAutoRoutingItems } from "../services/autorouting";
import { AutoRoutingItems, AutoRoutingPayload } from "../utils/types";
import { Button } from "../ui";
import { Add } from "../icons";

const AutoRoutingRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const { mutate: mutateCreateAutoRoutingItem } = useCustomMutation<void>(
    ({ payload }) => createAutoRoutingItem(payload),
    [],
    {
      onSuccess: () => {
        toastSuccess("AutoRouting item created");
      },
      onError: () => {
        toastError("Unable to create AutoRouting item");
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
      name: "New AutoRouting Item",
      eventType: "NewInstance",
      activated: true,
      router: {
        ruleCondition: "AND",
        rules: [
          {
            dicomTag: "PatientName",
            valueRepresentation: "string",
            value: "John Doe",
            condition: "EQUALS",
          },
        ],
        destinations: [
          {
            destination: "AET",
            name: "ORTHANC",
          },
        ],
      },
    }

    mutateCreateAutoRoutingItem({ payload });
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
      />
    </div>
  );
};

export default AutoRoutingRoot;

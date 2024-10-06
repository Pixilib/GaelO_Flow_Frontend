import React, { useMemo } from "react";
import { BsTrashFill as DeleteIcon } from "react-icons/bs";
import { RiAdminFill as AdminIcon } from "react-icons/ri";
import ToggleChevron from "../../ui/menu/ToogleChevron";
import { Table, Button, Label, Popover } from "../../ui";
import { Colors } from "../../utils/enums";
import { Label as LabelType } from "../../utils/types";
import LabelsRoles from "./LabelsRoles";

interface LabelsTableProps {
  data: LabelType[];
  onDeleteLabel: (labelName: string) => void;
}

const LabelsTable: React.FC<LabelsTableProps> = ({
  data = [],
  onDeleteLabel,
}) => {
  console.log(data)
  const rows = useMemo(() => data, [data]);

 const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Label",
        cell: ({ getValue }: any) => <Label value={getValue() as string} />,
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }: any) => (
          <div className="flex justify-center gap-2.5">
            <Popover
              withOnClick={true}
              popover={<LabelsRoles key={row.original.name} labelName={row.original.name} />}
              placement="bottom"
            >
              <Button color={Colors.secondary} className="flex items-center gap-1.5">
                <AdminIcon size="1.3rem" />
                <ToggleChevron isOpen={false} />
              </Button>
            </Popover>
            <Button onClick={() => onDeleteLabel(row.original.name)} color={Colors.danger}>
              <DeleteIcon size="1.3rem" className="transition duration-70 hover:scale-110" color={Colors.light} />
            </Button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Table
      columns={columns}
      data={rows}
      headerColor={Colors.white}
      headerTextSize="xs"
      className="bg-gray-100"
      enableColumnFilters
      enableSorting
    />
  );
};
export default LabelsTable;
